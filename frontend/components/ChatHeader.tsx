import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { FileText, ChevronDown, X } from 'lucide-react-native';
import { FileItem } from './FileItem';

interface ChatHeaderProps {
  selectedFile: any;
  files: any[];
  onSelectFile: (file: any) => void;
}

export function ChatHeader({ selectedFile, files, onSelectFile }: ChatHeaderProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.header}>
      <View style={styles.fileSelector}>
        <TouchableOpacity 
          style={styles.fileSelectorButton}
          onPress={() => setIsModalVisible(true)}
        >
          <View style={styles.selectedFile}>
            <View style={styles.fileIconContainer}>
              <FileText size={16} color="#6366f1" />
            </View>
            <Text style={styles.fileName} numberOfLines={1}>
              {selectedFile?.name || 'Select a file'}
            </Text>
          </View>
          <ChevronDown size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select a File</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <X size={24} color="#0f172a" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={files}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelectFile(item);
                    setIsModalVisible(false);
                  }}
                >
                  <FileItem file={item} />
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.filesList}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    padding: 16,
  },
  fileSelector: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    overflow: 'hidden',
  },
  fileSelectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  selectedFile: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  fileName: {
    fontSize: 16,
    color: '#0f172a',
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  closeButton: {
    padding: 4,
  },
  filesList: {
    padding: 16,
  },
});