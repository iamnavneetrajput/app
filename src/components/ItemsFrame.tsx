import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface Item {
    image: string;
    title: string;
    description: string;
    category?: string;
    date?: string;
}

interface ItemsFrameProps {
    item: Item;
    onPress: () => void;
    onDelete?: () => void;
    showHeartIcon?: boolean;
    showDateAndCategory?: boolean;
}

export default function ItemsFrame({
    item,
    onPress,
    onDelete,
    showHeartIcon,
    showDateAndCategory,
}: ItemsFrameProps) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                {showDateAndCategory && (
                    <View style={styles.dateCategoryContainer}>
                        <Text style={styles.category}>{item.category}</Text>
                        <Text style={styles.date}>{item.date}</Text>
                    </View>
                )}
            </View>
            {showHeartIcon && (
                <Ionicons name="heart-outline" size={24} color="gray" style={styles.heartIcon} />
            )}
            {onDelete && (
                <TouchableOpacity onPress={onDelete}>
                    <MaterialIcons name="clear" size={24} color="gray" />
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    cardImage: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 12,
    },
    cardContent: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 8,
    },
    dateCategoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    category: {
        fontSize: 12,
        color: 'gray',
    },
    date: {
        fontSize: 12,
        color: 'gray',
    },
    heartIcon: {
        marginLeft: 8,
        marginTop: -52,
        alignSelf: 'center',
    },
});
