import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, Surface, Button, Divider, useTheme} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {UserIcon, LockIcon} from '../../../../assets/icons';

interface EmploymentContractProps {
  palName: string;
  palId: string;
  price: string;
  onSign: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const EmploymentContract: React.FC<EmploymentContractProps> = ({
  palName,
  palId,
  price,
  onSign,
  onCancel,
  isLoading,
}) => {
...
export default EmploymentContract;
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#ffffff', '#f8f9fa']}
          style={styles.contractWrapper}
        >
          <Surface style={styles.contractCard} elevation={0}>
          <View style={styles.header}>
            <Text style={styles.contractLabel}>EMPLOYMENT CONTRACT</Text>
            <Text style={styles.idLabel}>ID: {palId.toUpperCase().slice(0, 12)}</Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PARTIES</Text>
            <Text style={styles.clause}>
              This agreement is entered into between <Text style={styles.bold}>The Sovereign (User)</Text> and 
              <Text style={styles.bold}> {palName} (Specialist Agent)</Text>.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SCOPE OF WORK</Text>
            <View style={styles.bulletItem}>
              <LockIcon stroke={theme.colors.primary} width={16} height={16} />
              <Text style={styles.bulletText}>Execution within IronClaw Security Enclave</Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bulletText}>• 2-Hour News Scout Refresh synchronization</Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bulletText}>• Forensic Trace auditing of all logic chains</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>COMPENSATION</Text>
            <Text style={styles.clause}>
              The Sovereign agrees to provide a placement fee of <Text style={styles.bold}>{price}</Text> for 
              unlimited operational access to this Specialist's domain capabilities.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.complianceText}>
              BY SIGNING, YOU INCORPORATE THIS AGENT INTO YOUR SOVEREIGN WORKFORCE.
            </Text>
          </View>
        </Surface>
        </LinearGradient>
      </ScrollView>

      <View style={styles.actions}>
        <Button mode="text" onPress={onCancel} style={styles.cancelButton}>
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={onSign}
          loading={isLoading}
          style={styles.signButton}
        >
          Sign & Incorporate
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contractWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 16,
  },
  contractCard: {
    padding: 24,
    backgroundColor: 'transparent',
  },
  header: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contractLabel: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#666',
  },
  idLabel: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#999',
  },
  divider: {
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#333',
    marginBottom: 8,
  },
  clause: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
  },
  bold: {
    fontWeight: '700',
    color: '#000',
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingLeft: 4,
  },
  bulletText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 8,
  },
  footer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 0.5,
    borderTopColor: '#eee',
  },
  complianceText: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 16,
  },
  cancelButton: {
    marginRight: 12,
  },
  signButton: {
    paddingHorizontal: 8,
  },
});
