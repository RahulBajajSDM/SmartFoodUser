// Map search component for searching a location

import * as Images from 'assets';
import colors from 'constants/colors';
import React, {forwardRef, useImperativeHandle, useRef, useEffect} from 'react';
import {Image, TouchableOpacity, View, Keyboard} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import IconsFa from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import idx from 'idx';
const GooglePlaceSearch = forwardRef((props, ref) => {
  let addedAddressed = useSelector((state) =>
    idx(state, (_) => _.dashboardReducer.allAddresses.data),
  );
  console.log(addedAddressed, 'addedAddressed');
  const {searchedLocation, formattedAddress, placeHolder, theme} = props;
  useImperativeHandle(ref, () => ({
    setSavedLocation() {
      useRef.locationRef.setAddressText(formattedAddress || '');
    },
  }));

  useEffect(() => {
    useRef.locationRef.setAddressText(formattedAddress || '');
  }, [formattedAddress]);
  const predefinedPlaces = [];
  addedAddressed &&
    addedAddressed.map((item) => {
      let modifyAddress = {
        description: item.name,
        formatted_address: item.formattedAddress,
        geometry: {
          location: {lat: Number(item.latitude), lng: Number(item.longitude)},
        },
      };
      predefinedPlaces.push(modifyAddress);
    });
  console.log(predefinedPlaces, 'predefinedPlaces');
  return (
    <View style={{flex: 1}}>
      <GooglePlacesAutocomplete
        ref={(instance) => {
          useRef.locationRef = instance;
        }}
        placeholder={placeHolder ? placeHolder : 'Search location'}
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key
        listViewDisplayed={false} // true/false/undefined
        fetchDetails={true}
        enablePoweredByContainer={false}
        predefinedPlaces={predefinedPlaces}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          searchedLocation(details);
          Keyboard.dismiss();
        }}
        onSubmitEditing={() => Keyboard.dismiss()}
        getDefaultValue={() => ''}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyAK_vkvxDH5vsqGkd0Qn-dDmq-rShTA7UA',
          language: 'en', // language of the results
        }}
        styles={{
          textInputContainer: {
            width: '100%',
            height: RFPercentage(12),
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            paddingHorizontal: RFValue(20),
          },
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          textInput: {
            borderRadius: RFValue(5),
            height: RFPercentage(6),
            elevation: 2,
            shadowOffset: {width: 10, height: 10},
            shadowColor: 'black',
            shadowOpacity: 0.1,
            color: theme == 'dark' ? colors.White : colors.Black,
            backgroundColor: theme == 'dark' ? colors.Black : colors.White,
          },
          listView: {
            width: '95%',
            paddingHorizontal: RFValue(20),
            backgroundColor: colors.White,
            position: 'absolute',
            top: RFPercentage(8),
          },
        }}
        // nearbyPlacesAPI={"GoogleReverseGeocoding"}
        //   predefinedPlaces={this.props.predefinedPlaces}
        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
        filterReverseGeocodingByTypes={[]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
      <TouchableOpacity
        onPress={() => {
          useRef.locationRef.setAddressText('');
        }}
        style={{
          height: RFPercentage(3),
          width: RFPercentage(3),
          backgroundColor: colors.Primary,
          borderRadius: RFValue(5),
          position: 'absolute',
          right: RFValue(35),
          justifyContent: 'center',
          alignItems: 'center',
          top: RFValue(18),
          paddingRight: RFValue(0),
        }}>
        <IconsFa name={'times'} size={RFValue(15)} color={colors.White} />
      </TouchableOpacity>
    </View>
  );
});

export default GooglePlaceSearch;
