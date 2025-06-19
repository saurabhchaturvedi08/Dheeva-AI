import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BookOpen, Scale, Stethoscope, GraduationCap, Briefcase } from 'lucide-react-native';

interface DomainSelectorProps {
  selectedDomain: string;
  onSelectDomain: (domain: string) => void;
}

export function DomainSelector({ selectedDomain, onSelectDomain }: DomainSelectorProps) {
  const domains = [
    { id: 'general', name: 'General', icon: BookOpen, color: '#6366f1' },
    { id: 'legal', name: 'Legal', icon: Scale, color: '#ef4444' },
    { id: 'medical', name: 'Medical', icon: Stethoscope, color: '#10b981' },
    { id: 'academic', name: 'Academic', icon: GraduationCap, color: '#3b82f6' },
    { id: 'business', name: 'Business', icon: Briefcase, color: '#f59e0b' },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {domains.map((domain) => (
        <TouchableOpacity
          key={domain.id}
          style={[
            styles.domainItem,
            selectedDomain === domain.id && styles.selectedDomain,
          ]}
          onPress={() => onSelectDomain(domain.id)}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${domain.color}20` },
              selectedDomain === domain.id && { backgroundColor: `${domain.color}40` },
            ]}
          >
            <domain.icon
              size={18}
              color={domain.color}
            />
          </View>
          <Text
            style={[
              styles.domainName,
              selectedDomain === domain.id && styles.selectedDomainName,
            ]}
          >
            {domain.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  domainItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  selectedDomain: {
    backgroundColor: '#e0e7ff',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  domainName: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  selectedDomainName: {
    color: '#6366f1',
    fontWeight: '600',
  },
});