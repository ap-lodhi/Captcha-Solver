const request = require('request');
const { createWorker } = require('tesseract.js');

// const imageUrl = 'https://i.ibb.co/jTKYQqP/Captcha-United.png';
const imageUrl = process.argv.slice(1);

// console.log(imageUrl[1])
request.get({ url: imageUrl[1], encoding: null }, (err, res, body) => {
  if (err) throw err;

  const worker = createWorker({
    logger: m => console.log(m)
  });

  (async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(body);
    console.log(text);
    await worker.terminate();
  })();
});




// https://v5.airtableusercontent.com/v1/15/15/1680516000000/tjxXw_zLAay5es2jzJcGrQ/4picMBl14JSUput0XQGuSXRN-QO_r9JtWWn7oU_V5yX_0YMwRowr3_Bj5Oxa-BtGfllT0BuspX0FAIySIUQeiQ/adehqCXtINVxPtGf30x4l6p-DfmcLR1uTVvxHpRrvSk
// https://quotescover.com/wp-content/uploads/Either-write-something-worth-reading__quotes-by-Benjamin-Franklin-86.png
