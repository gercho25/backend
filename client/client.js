const axios = require('axios');

const URL = 'http://localhost:9000/api';
const TOKEN = 'a70da940ce76c1217f03376a3ac725fc';

const setValues = async () => {
    try {
        return await axios.post(`${URL}/${TOKEN}/valores-api`, {
            data: [
                {
                    presion: 101000,
                    caudal: 98,
                    viento: 22.10
                }
            ]
          });
    } catch (error) {
        // console.error(error)
    }
}

setInterval(() => {
    console.log('1');
    setValues()
}, 3000);
