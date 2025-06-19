import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FileText, FileImage, FileAudio, FileVideo } from 'lucide-react-native';

type FileType = 'pdf' | 'image' | 'audio' | 'video';

interface FileItemProps {
  file: {
    id: string;
    name: string;
    type: FileType;
    size: string;
    domain: string;
    uploadDate: string;
  };
}

export function FileItem({ file }: FileItemProps) {
  const getFileIcon = () => {
    switch (file.type) {
      case 'pdf':
        return <FileText size={24} color="#ef4444" />;
      case 'image':
        return <FileImage size={24} color="#3b82f6" />;
      case 'audio':
        return <FileAudio size={24} color="#10b981" />;
      case 'video':
        return <FileVideo size={24} color="#f59e0b" />;
      default:
        return <FileText size={24} color="#6366f1" />;
    }
  };

  const getFileTypeColor = () => {
    switch (file.type) {
      case 'pdf':
        return '#fee2e2';
      case 'image':
        return '#dbeafe';
      case 'audio':
        return '#d1fae5';
      case 'video':
        return '#fef3c7';
      default:
        return '#e0e7ff';
    }
  };

  const getDomainBadgeColor = () => {
    switch (file.domain) {
      case 'legal':
        return { bg: '#fee2e2', text: '#ef4444' };
      case 'medical':
        return { bg: '#d1fae5', text: '#10b981' };
      case 'academic':
        return { bg: '#dbeafe', text: '#3b82f6' };
      case 'research':
        return { bg: '#fef3c7', text: '#f59e0b' };
      default:
        return { bg: '#e0e7ff', text: '#6366f1' };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: getFileTypeColor() }]}>
        {getFileIcon()}
      </View>
      <View style={styles.fileInfo}>
        <Text style={styles.fileName} numberOfLines={1}>
          {file.name}
        </Text>
        <View style={styles.fileDetails}>
          <Text style={styles.fileSize}>{file.size}</Text>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.fileDate}>{formatDate(file.uploadDate)}</Text>
        </View>
      </View>
      <View
        style={[
          styles.domainBadge,
          { backgroundColor: getDomainBadgeColor().bg }
        ]}
      >
        <Text
          style={[
            styles.domainText,
            { color: getDomainBadgeColor().text }
          ]}
        >
          {file.domain}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
    marginBottom: 4,
  },
  fileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileSize: {
    fontSize: 12,
    color: '#64748b',
  },
  bullet: {
    fontSize: 12,
    color: '#94a3b8',
    marginHorizontal: 4,
  },
  fileDate: {
    fontSize: 12,
    color: '#64748b',
  },
  domainBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  domainText: {
    fontSize: 10,
    fontWeight: '500',
  },
});