import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Button, Dimensions } from 'react-native';

import { NavigationProp } from '@react-navigation/native';

interface Props {
    navigation: NavigationProp<any>;
}

const PrebuiltPhotoScreen: React.FC<Props> = ({ navigation }) => {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    // Example list of prebuilt photo URLs
    const photos = [
        'https://www.kasandbox.org/programming-images/avatars/leaf-blue.png',
        'https://www.kasandbox.org/programming-images/avatars/leaf-green.png',
        'https://www.kasandbox.org/programming-images/avatars/cs-hopper-happy.png',
        'https://www.kasandbox.org/programming-images/avatars/cs-hopper-cool.png',
        'https://www.kasandbox.org/programming-images/avatars/leaf-orange.png',
        'https://www.kasandbox.org/programming-images/avatars/leaf-red.png',
        'https://www.kasandbox.org/programming-images/avatars/leaf-yellow.png',
        'https://www.kasandbox.org/programming-images/avatars/leafers-seed.png',
        'https://www.kasandbox.org/programming-images/avatars/leafers-sapling.png',
        'https://www.kasandbox.org/programming-images/avatars/leafers-seedling.png',
        'https://www.kasandbox.org/programming-images/avatars/leafers-tree.png',
        'https://www.kasandbox.org/programming-images/avatars/marcimus.png',
        'https://www.kasandbox.org/programming-images/avatars/mr-pink.png',
        'https://www.kasandbox.org/programming-images/avatars/mr-pink-green.png',
    ];

    const handlePhotoSelect = (photo: string) => {
        setSelectedPhoto(photo);
    };

    const handleConfirm = () => {
        if (selectedPhoto) {
            // Navigate or pass the selected photo to the backend or the next screen
            navigation.navigate('Profile', { selectedPhoto });
        } else {
            alert('Please select a photo first.');
        }
    };

    const { width } = Dimensions.get('window');
    const imageSize = width / 2 - 20; // Adjust the size to fit two images per row with some margin

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select a Prebuilt Photo</Text>
            <FlatList
                data={photos}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handlePhotoSelect(item)}
                        style={[
                            styles.photoContainer,
                            selectedPhoto === item && styles.selectedPhotoContainer,
                        ]}
                    >
                        <Image source={{ uri: item }} style={[styles.photo, { width: imageSize, height: imageSize }]} />
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.photoList}
            />
            <Button title="Confirm" onPress={handleConfirm} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    photoList: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoContainer: {
        margin: 10,
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 10,
        overflow: 'hidden',
    },
    selectedPhotoContainer: {
        borderColor: 'blue',
    },
    photo: {
        // width and height will be set dynamically
    },
});

export default PrebuiltPhotoScreen;
