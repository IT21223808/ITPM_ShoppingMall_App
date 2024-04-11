import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

const productSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  shortDescription: Yup.string().required('Short description is required'),
  longDescription: Yup.string().required('Long description is required'),
});

export default function addnewcategory() {
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{
          title: '',
          shortDescription: '',
          longDescription: '',
        }}
        validationSchema={productSchema}
        onSubmit={(values) => {
          console.log(values);
          console.log("Image URI: ", imageUri);
          // Submit your form values and the image uri to your backend or state management
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <TextInput
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              placeholder="Title"
              style={styles.input}
            />
            {errors.title && touched.title && <Text style={styles.error}>{errors.title}</Text>}
            <TextInput
              onChangeText={handleChange('shortDescription')}
              onBlur={handleBlur('shortDescription')}
              value={values.shortDescription}
              placeholder="Short Description"
              style={[styles.input, styles.multilineInput]}
              multiline
            />
            {errors.shortDescription && touched.shortDescription && <Text style={styles.error}>{errors.shortDescription}</Text>}
            <TextInput
              onChangeText={handleChange('longDescription')}
              onBlur={handleBlur('longDescription')}
              value={values.longDescription}
              placeholder="Long Description"
              style={[styles.input, styles.multilineInput]}
              multiline
            />
            {errors.longDescription && touched.longDescription && <Text style={styles.error}>{errors.longDescription}</Text>}

            <TouchableOpacity onPress={pickImage} style={styles.button}>
              <Text>Upload Image</Text>
            </TouchableOpacity>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  form: {
    width: width * 0.9,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 5,
    width: '100%',
    borderRadius: 5,
  },
  multilineInput: {
    height: 100,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    resizeMode: 'cover',
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
});
