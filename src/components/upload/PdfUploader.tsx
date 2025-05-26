import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, Loader } from 'lucide-react';
import Button from '../ui/Button';
import { processPdf } from '../../utils/pdfProcessor';

interface PdfUploaderProps {
  onProcessComplete: (data: any) => void;
  onError: (error: string) => void;
}

export const PdfUploader: React.FC<PdfUploaderProps> = ({ onProcessComplete, onError }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsProcessing(true);
      console.log('Starting PDF processing for file:', file.name);

      const data = await processPdf(file);
      console.log('PDF processing completed successfully');
      onProcessComplete(data);
    } catch (error) {
      console.error('PDF processing error:', error);
      onError(error instanceof Error ? error.message : 'Failed to process PDF');
    } finally {
      setIsProcessing(false);
    }
  }, [onProcessComplete, onError]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024 // 50MB
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragActive
            ? 'border-slate-400 bg-slate-50'
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          {isProcessing ? (
            <Loader className="w-12 h-12 text-slate-400 animate-spin" />
          ) : (
            <Upload
              className={`w-12 h-12 ${
                isDragActive ? 'text-slate-600' : 'text-slate-400'
              }`}
            />
          )}
          <div className="text-sm">
            {isProcessing ? (
              <p className="text-slate-600 font-medium">Processing PDF...</p>
            ) : isDragActive ? (
              <p className="text-slate-600 font-medium">Drop your thesis PDF here</p>
            ) : (
              <p className="text-slate-500">
                Drag and drop your thesis PDF, or{' '}
                <span className="text-blue-500 hover:text-blue-600 cursor-pointer">
                  browse
                </span>
              </p>
            )}
          </div>
          <p className="text-xs text-slate-400">PDF files only, max 50MB</p>
        </div>
      </div>

      {acceptedFiles.length > 0 && !isProcessing && (
        <div className="mt-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-slate-400" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {acceptedFiles[0].name}
                </p>
                <p className="text-xs text-slate-500">
                  {(acceptedFiles[0].size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-slate-500"
                onClick={(e) => {
                  e.stopPropagation();
                  acceptedFiles.splice(0, acceptedFiles.length);
                }}
                icon={<X size={14} />}
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfUploader;