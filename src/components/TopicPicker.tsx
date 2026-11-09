import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  items: { id: string; detail?: string }[];
  selected: string[];
  multiple?: boolean;
  accessibilityLabel: string;
  onChange: (ids: string[]) => void;
};

/** A short overview stays usable while the full topic list has its own sheet. */
export default function TopicPicker({ items, selected, multiple = false, accessibilityLabel, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const summary = selected.length === 0 ? 'All topics'
    : selected.length === 1 ? selected[0] : selected.length + ' topics selected';

  function select(id: string) {
    onChange(multiple
      ? selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id]
      : [id]);
    if (!multiple) setOpen(false);
  }

  return <>
    <Pressable accessibilityRole="button" accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ text: summary }} onPress={() => setOpen(true)} style={styles.trigger}>
      <View style={styles.copy}><Text style={styles.kicker}>TOPICS</Text><Text style={styles.summary}>{summary}</Text></View>
      <Text style={styles.change}>Change ›</Text>
    </Pressable>
    <Modal visible={open} animationType="slide" onRequestClose={() => setOpen(false)}>
      <SafeAreaView style={styles.sheet}>
        <View style={styles.header}>
          <Text accessibilityRole="header" style={styles.title}>Choose topics</Text>
          <Pressable accessibilityRole="button" accessibilityLabel="Close topic picker" onPress={() => setOpen(false)} style={styles.close}>
            <Text style={styles.change}>Close</Text>
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={styles.list}>
          <Text style={styles.help}>{multiple ? 'Choose one or more topics, or use the whole question bank.' : 'Choose a topic, or browse the whole question bank.'}</Text>
          <Pressable accessibilityRole={multiple ? 'checkbox' : 'radio'} accessibilityLabel="All topics"
            accessibilityState={{ checked: selected.length === 0 }}
            onPress={() => { onChange([]); if (!multiple) setOpen(false); }}
            style={[styles.item, selected.length === 0 && styles.selected]}>
            <Text style={styles.itemText}>{selected.length === 0 ? '✓ ' : '○ '}All topics</Text>
          </Pressable>
          {items.map((item) => <Pressable key={item.id} accessibilityRole={multiple ? 'checkbox' : 'radio'}
            accessibilityLabel={item.id} accessibilityState={{ checked: selected.includes(item.id) }}
            onPress={() => select(item.id)} style={[styles.item, selected.includes(item.id) && styles.selected]}>
            <Text style={styles.itemText}>{selected.includes(item.id) ? '✓ ' : '○ '}{item.id}</Text>
            {item.detail ? <Text style={styles.detail}>{item.detail}</Text> : null}
          </Pressable>)}
        </ScrollView>
        <View style={styles.footer}>
          <Pressable accessibilityRole="button" onPress={() => setOpen(false)} style={styles.done}>
            <Text style={styles.doneText}>Done · {summary}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  </>;
}

const styles = StyleSheet.create({
  trigger: { minHeight: 62, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12,
    borderWidth: 1, borderColor: '#DCE4F0', borderRadius: 14, backgroundColor: '#FFFFFF', marginVertical: 12 },
  copy: { flex: 1 }, kicker: { fontSize: 9, fontWeight: '800', color: '#66758B', letterSpacing: 0.6 },
  summary: { color: '#14233B', fontSize: 14, fontWeight: '800', marginTop: 4 },
  change: { color: '#2456C7', fontWeight: '800', fontSize: 13 },
  sheet: { flex: 1, backgroundColor: '#F5F7FB' },
  header: { paddingHorizontal: 18, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  title: { color: '#14233B', fontSize: 22, fontWeight: '900', flex: 1 },
  close: { padding: 12, minHeight: 44 },
  list: { padding: 18 }, help: { color: '#66758B', fontSize: 13, lineHeight: 20, marginBottom: 16 },
  item: { borderWidth: 1, borderColor: '#DCE4F0', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 13, marginBottom: 9, minHeight: 54 },
  selected: { borderColor: '#2456C7', backgroundColor: '#EDF3FF' },
  itemText: { color: '#14233B', fontSize: 15, fontWeight: '800' },
  detail: { color: '#66758B', fontSize: 12, marginTop: 6 },
  footer: { padding: 16, borderTopWidth: 1, borderColor: '#DCE4F0', backgroundColor: '#FFFFFF' },
  done: { backgroundColor: '#2456C7', padding: 15, minHeight: 50, borderRadius: 13, alignItems: 'center' },
  doneText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14, textAlign: 'center' },
});
