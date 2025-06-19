import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { FilePlus, FileText, FileImage, FileAudio, FileVideo, Plus } from 'lucide-react-native';
import { FileItem } from '@/components/FileItem';
import { MOCK_FILES } from '@/constants/mockData';
import { DomainSelector } from '@/components/DomainSelector';

export default function HomeScreen() {
  const [selectedDomain, setSelectedDomain] = useState('general');
  const [files, setFiles] = useState(MOCK_FILES);

  const handleFilePick = () => {
    // This would integrate with document picker in a real implementation
    console.log('Pick file');
    // For demo, we'll just add a mock file
    const newFile = {
      id: String(Date.now()),
      name: `Document_${files.length + 1}.pdf`,
      type: 'pdf',
      size: '1.2 MB',
      domain: selectedDomain,
      uploadDate: new Date().toISOString(),
    };
    setFiles([newFile, ...files]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome to Dheeva</Text>
          <Text style={styles.welcomeSubtitle}>
            Your AI-powered document assistant
          </Text>
        </View>

        {/* Domain Selector */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Select Domain</Text>
          <DomainSelector 
            selectedDomain={selectedDomain} 
            onSelectDomain={setSelectedDomain} 
          />
        </View>

        {/* Upload Section */}
        <View style={styles.uploadSection}>
          <TouchableOpacity style={styles.uploadButton} onPress={handleFilePick}>
            <FilePlus color="#6366f1" size={32} />
            <Text style={styles.uploadText}>Upload File</Text>
            <Text style={styles.uploadSubtext}>
              PDF, Image, Audio, or Video
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recent Files Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Files</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </View>

          {files.length > 0 ? (
            <View style={styles.filesList}>
              {files.map((file) => (
                <Link key={file.id} href={`/file/${file.id}`} asChild>
                  <TouchableOpacity>
                    <FileItem file={file} />
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No files uploaded yet. Upload a file to get started.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      
      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={handleFilePick}>
        <Plus color="#fff" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    padding: 16,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  seeAllButton: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '500',
  },
  uploadSection: {
    marginBottom: 24,
  },
  uploadButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginTop: 12,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  filesList: {
    gap: 12,
  },
  emptyState: {
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    textAlign: 'center',
    color: '#64748b',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#6366f1',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});