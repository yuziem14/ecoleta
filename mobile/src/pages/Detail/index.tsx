import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import * as MailComposer from 'expo-mail-composer';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

import api from '../../services/api';

import styles from './styles';

interface Params {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    phone_number: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}

const Detail: React.FC = () => {
  const [data, setData] = useState<Data>({} as Data);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchPoint = async () => {
      const { data } = await api.get(`points/${routeParams.point_id}`, {
        cancelToken: source.token,
      });
      setData(data);
    };

    fetchPoint();

    return function cleanUp() {
      source.cancel();
    };
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.point.email],
    });
  }

  function handleWhatsapp() {
    const phone = Math.trunc(Number(data.point.phone_number));

    Linking.openURL(
      `whatsapp://send?phone=${data.point.phone_number}&text=Tenho interesse sobre coleta de resíduos`
    );
  }

  if (!data.point) {
    return null;
  }

  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name='arrow-left' size={20} color='#34cb79' />
        </TouchableOpacity>
        <Image
          style={styles.pointImage}
          source={{
            uri: data.point.image_url,
          }}
        />

        <Text style={styles.pointName}>{data.point.name}</Text>
        <Text style={styles.pointItems}>
          {data.items.map(item => item.title).join(', ')}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>
            {data.point.city}, {data.point.uf}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name='whatsapp' width={20} color='#FFF' />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={handleComposeMail}>
          <Icon name='mail' width={20} color='#FFF' />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

export default Detail;
