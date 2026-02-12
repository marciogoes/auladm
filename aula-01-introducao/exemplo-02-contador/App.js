/**
 * Exemplo 02 — Contador Interativo
 * 
 * Conceitos: useState, Button, onPress, renderização condicional.
 * 
 * Referência: Slide 10 — "Exemplo de Código: Interatividade"
 * 
 * Pontos de atenção para os alunos:
 * - useState funciona EXATAMENTE igual ao React Web
 * - onPress é o equivalente ao onClick
 * - Button do React Native é um componente pronto (diferente do <button> HTML)
 * - Renderização condicional {cont > 5 && ...} funciona igual
 */

import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Contador = () => {
  const [cont, setCont] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contador Interativo</Text>

      <Text style={styles.valor}>{cont}</Text>

      {/* Renderização condicional — mesmo conceito da web */}
      {cont >= 10 && (
        <Text style={styles.alerta}>🎉 Chegou a 10!</Text>
      )}

      <View style={styles.botoes}>
        <View style={styles.botao}>
          <Button
            title="➕ Somar"
            onPress={() => setCont(cont + 1)}
            color="#4CAF50"
          />
        </View>

        <View style={styles.botao}>
          <Button
            title="➖ Subtrair"
            onPress={() => setCont(cont - 1)}
            color="#FF9800"
          />
        </View>

        <View style={styles.botao}>
          <Button
            title="🔄 Resetar"
            onPress={() => setCont(0)}
            color="#F44336"
          />
        </View>
      </View>

      <Text style={styles.dica}>
        💡 O hook useState funciona igual ao React Web!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  valor: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
  },
  alerta: {
    fontSize: 18,
    color: '#4CAF50',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  botoes: {
    width: '80%',
    marginTop: 20,
  },
  botao: {
    marginVertical: 6,
  },
  dica: {
    marginTop: 30,
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default Contador;
