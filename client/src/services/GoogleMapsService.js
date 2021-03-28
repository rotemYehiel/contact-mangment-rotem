import axios from 'axios';
const apiKey = 'AIzaSyCOEk_XWDQv80ftkPMplMmWFNB2hoGpZVc';
const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';


const geoCode = (location) => {
    const validAddress = axios.get(`${baseUrl}`, {
        params: {
            address: location,
            key: apiKey
        }
    }).then((response) => {
        const address = {};
        const addressComponents = response.data.results[0]['address_components'];
        addressComponents.forEach(cmp => {
            const dataType = cmp.types;
            if (dataType.includes('street_number')) {
                address.streetNum = cmp['long_name']
            } else if (dataType.includes('route')) {
                address.street = cmp['long_name']
            } else if (dataType.includes('locality')) {
                address.city = cmp['long_name']
            } else if (dataType.includes('administrative_area_level_1')) {
                address.state = cmp['long_name']
            } else if (dataType.includes('postal_code')) {
                address.postalCode = cmp['long_name']
            } else {
                return
            }
        })
        return createValidAddressOb(address);

    }).catch((error) => {
        console.log(error);
    })
    return validAddress
}



const createValidAddressOb = (addressOb) => {
    return {
        'Street': `${(addressOb.streetNum) ? addressOb.streetNum : ''} ${(addressOb.street) ? addressOb.street : ''}`,
        'City': (addressOb.city) ? addressOb.city : null,
        'State': (addressOb.state) ? addressOb.state : null,
        'Postal Code': (addressOb.postalCode) ? addressOb.postalCode : null
    }
}

const createAddressStr = (addressOb) => {
    return `${(addressOb['Street']) ? addressOb['Street'] : ''} ,
    ${(addressOb['City']) ? addressOb['City'] : ''} ,
    ${(addressOb['State']) ? addressOb['State'] : ''} ,
    ${(addressOb['Postal Code']) ? addressOb['Postal Code'] : ''}`
}

const GoogleMapsService = {
    geoCode,
    createAddressStr,
    createAddressOb: createValidAddressOb
}
export default GoogleMapsService;