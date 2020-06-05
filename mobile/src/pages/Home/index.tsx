import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  Platform,
  Alert,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import SelectPicker from 'react-native-picker-select';
import { Feather as Icon } from '@expo/vector-icons';
import axios from 'axios';

interface IBGEUFResponse {
  id: number;
  sigla: string;
}

interface UF {
  id: number;
  initial: string;
}

interface IBGECityResponse {
  id: number;
  nome: string;
}

interface City {
  id: number;
  name: string;
}

import { styles, pickerStyles } from './styles';

const Home: React.FC = () => {
  const [ufs, setUfs] = useState<UF[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [uf, setUf] = useState<string>('');
  const [city, setCity] = useState<string>('');

  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
        {
          params: {
            orderBy: 'nome',
          },
        }
      )
      .then(response => {
        const data = response.data.map(uf => ({
          id: uf.id,
          initial: uf.sigla,
        }));

        setUfs(data);
      })
      .catch(err => {
        console.warn(err);
        Alert.alert('Whoops...', 'Não foi possível carregar as UFs');
      });
  }, []);

  useEffect(() => {
    if (!uf) return;

    setCities([]);
    setCity('');

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
        {
          timeout: 5000,
          maxContentLength: 100000000,
        }
      )
      .then(response => {
        const data = response.data.map(city => ({
          id: city.id,
          name: city.nome,
        }));

        setCities(data);
      })
      .catch(err => {
        console.warn(err);
        Alert.alert(
          'Whoops...',
          `Não foi possível carregar os municipios de ${uf}`
        );
      });
  }, [uf]);

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf,
      city,
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.fill}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground
        source={require('../../assets/home-background.png')}
        style={styles.container}
        resizeMode='contain'
        imageStyle={{
          width: 274,
          height: 368,
        }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>
              Seu marketplace de coleta de resíduos
            </Text>
            <Text style={styles.description}>
              Ajudamos pessoas a encontrarem pontos de coleta de forma
              eficiente.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          {/* <TextInput
            style={styles.input}
            placeholder='Digite a UF'
            value={uf}
            maxLength={2}
            autoCapitalize='characters'
            autoCorrect={false}
            onChangeText={text => setUf(text)}
          />
          
          <TextInput
            style={styles.input}
            placeholder='Digite a cidade'
            value={city}
            autoCorrect={false}
            onChangeText={text => setCity(text)}
          /> */}

          <SelectPicker
            placeholder={{ label: 'Selecione a UF', color: '#ddd', value: '' }}
            style={pickerStyles}
            items={ufs.map(uf => ({
              label: uf.initial,
              value: uf.initial,
              key: String(uf.id),
            }))}
            value={uf}
            onValueChange={value => uf !== value && setUf(value)}
            useNativeAndroidPickerStyle={false}
          />

          <SelectPicker
            style={pickerStyles}
            placeholder={{
              label: 'Selecione a cidade',
              color: '#ddd',
              value: '',
            }}
            items={cities.map(city => ({
              label: city.name,
              value: city.name,
              key: city.id,
            }))}
            value={city}
            onValueChange={value => setCity(value)}
            disabled={cities.length === 0}
            useNativeAndroidPickerStyle={false}
          />

          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name='arrow-right' color='#FFF' size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Home;
