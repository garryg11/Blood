import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from '@/lib/i18n';
import { manualLabEntrySchema, type ManualLabEntry } from '@shared/schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/queryClient';

interface UploadScreenProps {
  sessionId: string;
  onProcessingStart: () => void;
}

export function UploadScreen({ sessionId, onProcessingStart }: UploadScreenProps) {
  const { t } = useTranslation();
  const [isDragOver, setIsDragOver] = useState(false);

  const form = useForm<ManualLabEntry>({
    resolver: zodResolver(manualLabEntrySchema),
    defaultValues: {
      testName: '',
      value: '',
      unit: '',
    },
  });

  const uploadMutation = useMutation({
    mutationFn: () => apiRequest('POST', `/api/lab-sessions/${sessionId}/upload`),
    onSuccess: () => {
      onProcessingStart();
    },
  });

  const manualEntryMutation = useMutation({
    mutationFn: (data: ManualLabEntry) => 
      apiRequest('POST', `/api/lab-sessions/${sessionId}/manual-entry`, data),
    onSuccess: () => {
      onProcessingStart();
    },
  });

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    // Validate file type and size
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, JPG, or PNG file.');
      return;
    }

    if (file.size > maxSize) {
      alert('File size must be less than 10MB.');
      return;
    }

    uploadMutation.mutate();
  };

  const onSubmit = (data: ManualLabEntry) => {
    manualEntryMutation.mutate(data);
  };

  return (
    <div className="fade-in space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-semibold text-foreground">{t('upload.title')}</h2>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto">
          {t('upload.subtitle')}
        </p>
      </div>

      <div className="space-y-6">
        {/* Upload Area */}
        <div
          onDrop={handleFileDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          className={`border-2 border-dashed rounded-xl p-8 text-center bg-card transition-colors ${
            isDragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary'
          }`}
          data-testid="upload-dropzone"
        >
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <i className="fas fa-cloud-upload-alt text-2xl text-primary"></i>
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground">{t('upload.dropText')}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t('upload.supportedFiles')}</p>
            </div>
            <div>
              <input
                type="file"
                id="file-input"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                data-testid="input-file"
              />
              <label htmlFor="file-input">
                <Button 
                  type="button" 
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors cursor-pointer"
                  data-testid="button-choose-file"
                  disabled={uploadMutation.isPending}
                >
                  <i className="fas fa-plus mr-2"></i>
                  {t('upload.chooseFile')}
                </Button>
              </label>
            </div>
          </div>
        </div>

        {/* OR Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-background text-muted-foreground">{t('upload.manualEntry')}</span>
          </div>
        </div>

        {/* Manual Entry */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-medium text-foreground">{t('upload.manualTitle')}</h3>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="testName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.testName')}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Cholesterol" 
                          {...field}
                          data-testid="input-test-name"
                          className="text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.value')}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., 180" 
                          {...field}
                          data-testid="input-test-value"
                          className="text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.unit')}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., mg/dL" 
                          {...field}
                          data-testid="input-test-unit"
                          className="text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex items-end">
                  <Button 
                    type="submit"
                    className="w-full px-4 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                    disabled={manualEntryMutation.isPending}
                    data-testid="button-add-test"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    {t('form.addTest')}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-accent/50 border border-border rounded-lg p-4 text-center">
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <i className="fas fa-lock"></i>
          <span>{t('privacy.notice')}</span>
        </div>
      </div>
    </div>
  );
}
