import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';

const MAX_SIZE = 5 * 1024 * 1024;

interface ImageDropzoneProps {
  onFile: (file: File) => void;
  initialUrl?: string;
  className?: string;
}

export function ImageDropzone({ onFile, initialUrl, className }: ImageDropzoneProps) {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
    },
    maxSize: MAX_SIZE,
    multiple: false,
    onDrop: (files) => {
      const f = files[0];
      if (!f) return;
      setPreview(URL.createObjectURL(f));
      onFile(f);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
        isDragActive
          ? 'border-primary bg-primary/5'
          : 'border-muted-foreground/30 hover:border-muted-foreground/60',
        className,
      )}
    >
      <input {...getInputProps()} />
      {preview ? (
        <img src={preview} alt="" className="mx-auto max-h-48 rounded" />
      ) : (
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <UploadCloud className="w-8 h-8" />
          <p className="text-sm">{t('dropzone.prompt')}</p>
          <p className="text-xs">{t('dropzone.hint')}</p>
        </div>
      )}
    </div>
  );
}
