import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FileText, FileImage, FileAudio, FileVideo } from 'lucide-react-native';

interface FilePreviewProps {
  file: {
    id: string;
    name: string;
    type: string;
    size: string;
  };
}

export function FilePreview({ file }: FilePreviewProps) {
  const renderPreview = () => {
    switch (file.type) {
      case 'image':
        // In a real app, this would display the actual image
        return (
          <View style={styles.imagePreview}>
            <FileImage size={32} color="#3b82f6" />
            <Text style={styles.previewText}>Image Preview</Text>
          </View>
        );
      case 'pdf':
        return (
          <View style={styles.pdfPreview}>
            <FileText size={32} color="#ef4444" />
            <Text style={styles.previewText}>PDF Document</Text>
          </View>
        );
      case 'audio':
        return (
          <View style={styles.audioPreview}>
            <FileAudio size={32} color="#10b981" />
            <Text style={styles.previewText}>Audio File</Text>
          </View>
        );
      case 'video':
        return (
          <View style={styles.videoPreview}>
            <FileVideo size={32} color="#f59e0b" />
            <Text style={styles.previewText}>Video File</Text>
          </View>
        );
      default:
        return (
          <View style={styles.defaultPreview}>
            <FileText size={32} color="#6366f1" />
            <Text style={styles.previewText}>File Preview</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderPreview()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dbeafe',
    width: '90%',
    height: 80,
    borderRadius: 8,
  },
  pdfPreview: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    width: '90%',
    height: 80,
    borderRadius: 8,
  },
  audioPreview: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d1fae5',
    width: '90%',
    height: 80,
    borderRadius: 8,
  },
  videoPreview: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    width: '90%',
    height: 80,
    borderRadius: 8,
  },
  defaultPreview: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e7ff',
    width: '90%',
    height: 80,
    borderRadius: 8,
  },
  previewText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500',
  },
});