const vision = require('@google-cloud/vision').v1p3beta1;
const client = new vision.ImageAnnotatorClient();

class VisionController {
    static convert(req, res) { 
        const request = {
            image: {
                source: {
                    // imageUri: `https://storage.googleapis.com/gif-you-smile/1541745301494ksm-itb.jpg`,
                    imageUri: req.body.imgLink
                },
            },
            feature: {
                languageHints: ['en-t-i0-handwrit'],
            },
        };

        client
            .documentTextDetection(request)
            .then(results => {
                const fullTextAnnotation = results[0].fullTextAnnotation;
                const kuliah = fullTextAnnotation.text.split('\n');
                let arr_mataKuliah = [];

                for (let i = 0; i < kuliah.length; i++) {
                    if (kuliah[i] === 'NAMA MATAKULIAH') {
                        for (let j = i+1; j < kuliah.length; j++) {
                            arr_mataKuliah.push(kuliah[j]);
                        }
                    }
                }

                for (let i = 0; i < arr_mataKuliah.length; i++) {
                    if (arr_mataKuliah[i] === "HONDOEN") {
                        for (let j = i; j < arr_mataKuliah.length; j++) {
                            arr_mataKuliah.splice(j, 1);
                        }
                    }
                }

                arr_mataKuliah.pop();
                // console.log('List Mata Kuliah', arr_mataKuliah);
                res.status(200).json({
                    mata_kuliah: arr_mataKuliah
                });
                // console.log(`Full text: ${fullTextAnnotation.text}`);
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    }
}

module.exports = VisionController;