
import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform,
    ActivityIndicator,
    Button,
} from "react-native";
import MapView, { Circle, Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";

import * as Location from 'expo-location';
import { mapDarkStyle, mapStandardStyle } from './models';
import { useTheme } from '@react-navigation/native';
const { width, } = Dimensions.get("window");
const CARD_HEIGHT = 150;
const CARD_WIDTH = width * 0.3;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

import { Colors } from '../../styles';
import AuthContext from '../../contexts/auth';
import { DealService } from '../../services/deal.service';


interface IMarker {
    _id: string;
    coordinate: ICoordenada;
    title: string;
    value: number;
    description: string;
    image: string;
}
interface ICoordenada {
    latitude: number;
    longitude: number;
}




const MapApp: React.FC = () => {

    const { user } = useContext(AuthContext);

    const initialMapState = {
        markers: [] as IMarker[],
    //    region: {
    //        latitude: -23.550164466,
    //        longitude: -46.633664132,
    //        latitudeDelta: 0.04072262100681456,
    //        longitudeDelta: 0.02762541174888611,
    //    } as Region
        region: {
            latitude: user.location.lat,
            longitude: user.location.lng,
            latitudeDelta: 0.04072262100681456,
            longitudeDelta: 0.02762541174888611,
        } as Region

    };



    const [region, setRegion] = useState(initialMapState.region);
    const [markers, setMarkers] = useState(initialMapState.markers);


    const [showLookingForCoordinate, setShowLookingForCoordinate] = useState(true); 


    const [errorMsg, setErrorMsg] = useState(''); 


    const [loading, setLoading] = useState(true);

    const _map = React.useRef(null);
    const _scrollView = React.useRef(null);

    const Search = async () => {

        try {
            setLoading(true);
            const response = await DealService.search();
            if (response.data) {
                const markersData = [] as IMarker[];
                if (response.data.length > 0) {


                    //const dataFilter = response.data.filter(x => m.find(y => y._id === x._id) === null);

                    response.data.map((v) => {
                        markersData.push({
                            _id: v._id,
                            coordinate: {
                                latitude: v.location.lat,
                                longitude: v.location.lng,
                            },
                            title: v.type === 1 ? "Venda" : v.type === 2 ? "Troca" : "Desejo",
                            value: v.value,
                            description: v.description,
                            image: v.photos[0].src
                        });
                        if (markersData.length > 0)
                            setMarkers(markersData);
                            //setMarkers(markers.concat(markersData));
                    });
                }
            }
        } catch (e: Error | any) {
            setErrorMsg("Error => " + e.message);
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {

        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            console.log("Location Status =>", status);
            if (status !== 'granted') {
                setErrorMsg('No permission to get current location!');
                setShowLookingForCoordinate(false);
                return;
            }
            else {

                const location = await Location.getCurrentPositionAsync({});
                setShowLookingForCoordinate(false);
                _map.current.animateToRegion({

                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: initialMapState.region.latitudeDelta,
                    longitudeDelta: initialMapState.region.longitudeDelta,
                }, 350);

                setRegion({ ...region, latitude: location.coords.latitude, longitude: location.coords.longitude })
                await Search();
            }
        })();
    }, []);



    const theme = useTheme();

    const mapAnimation = new Animated.Value(0);

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 2); // animate 30% away from landing on the next item
            if (index >= markers.length) {
                index = markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }
        });
    });

    const interpolations = markers.map((marker, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        });

        return { scale };
    });

    const onMarkerPress = (mapEventData: any) => {
        const markerID = mapEventData._targetInst.return.key;

        let x = (markerID * CARD_WIDTH) + (markerID * 20);
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        }

        _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    }

    


    const onRegionChangeComplete = (e: Region) => {
        if (!loading) {
            setRegion(e)
        }
    }


    const styles = StyleSheet.create({

        viewSearch: {
            position: 'absolute',
            top: Platform.OS === 'ios' ? 70 : 60,
            marginLeft: (width / 2) - 130,
            width: 260,
        },
        viewLoading: {
            position: 'absolute',
            top: Platform.OS === 'ios' ? 140 : 130,
            marginLeft: (width / 2) - 110,
            width: 220,
            height: 50,
            alignItems: "center"
        },
        txtSearch: {
            color: Colors.BLACK,
            fontWeight: '900',
            fontSize: 20,
            alignItems: "center",
            textAlign: "center",
            alignContent: "center",
            alignSelf: "center"

        },

        container: {
            flex: 1,
        },
        scrollView: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingVertical: 15,
        },
        endPadding: {
            paddingRight: width - CARD_WIDTH,
        },
        card: {
            // padding: 10,
            elevation: 2,
            backgroundColor: "#FFF",
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            marginRight: 15,
            shadowColor: "#000",
            shadowRadius: 5,
            shadowOpacity: 0.3,
            shadowOffset: { width: 2, height: -2 },
            height: CARD_HEIGHT,
            width: CARD_WIDTH,
            overflow: "hidden",
        },
        cardImage: {
            flex: 3,
            width: "100%",
            height: "100%",
            alignSelf: "center",
        },
        textContent: {
            flex: 2,
            padding: 10,
        },
        cardtitle: {
            fontSize: 12,
            // marginTop: 5,
            fontWeight: "bold",
        },
        cardDescription: {
            fontSize: 12,
            color: "#444",
        },
        markerWrap: {
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
        },
        marker: {
            width: 30,
            height: 30,
        },
        button: {
            alignItems: 'center',
            marginTop: 5
        }
    });

    return (
        <View style={styles.container}>
            <MapView
                ref={_map}
                initialRegion={region}
                style={styles.container}
                provider={PROVIDER_GOOGLE}
                customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
                onRegionChangeComplete={onRegionChangeComplete}

            >
                {markers.map((marker, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolations[index].scale,
                            },
                        ],
                    };
                    return (
                        <Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>
                            <Animated.View style={[styles.markerWrap]}>
                                <Animated.Image
                                    source={require('../../assets/images/map_marker.png')}
                                    style={[styles.marker, scaleStyle]}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        </Marker>
                    );
                })}
                {/*<Circle*/}
                {/*    //key={marker.id}*/}
                {/*    center={{*/}
                {/*        latitude: region.latitude,*/}
                {/*        longitude: region.longitude*/}
                {/*    }}*/}
                {/*    radius={5000}*/}
                {/*    strokeColor={'rgba(100,100,100,.5)'} fillColor={'rgba(100,100,100,.5)'}*/}
                {/*    zIndex={2}*/}
                {/*    strokeWidth={1}*/}
                {/*    miterLimit={0}*/}
                {/*/>*/}
            </MapView>
            <View style={[styles.viewSearch, { display: showLookingForCoordinate ? 'flex' : 'none' }]} >
                <Text style={styles.txtSearch}>GETTING COORDINATES</Text>
            </View>
            <View style={[styles.viewLoading, { display: loading ? 'flex' : 'none' }]} >
                <ActivityIndicator size="large" color={Colors.BLACK} />
            </View>
            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                style={styles.scrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET
                }}
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                }
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
            >
                {markers.map((marker, index) => (
                    <TouchableOpacity onPress={() => alert(marker.description)} key={index}>
                    <View style={styles.card}  >
                        
                            <Image
                                source={{ uri: marker.image }}
                                style={styles.cardImage}
                                resizeMode="cover"
                            
                            />
                            <View style={styles.textContent}>
                                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                                <Text numberOfLines={1} style={styles.cardtitle}>{marker.value}</Text>
                                <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
                            </View>
                        
                        </View>
                    </TouchableOpacity>
                ))}
            </Animated.ScrollView>
        </View>
    );
};

export default MapApp;
