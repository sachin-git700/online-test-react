# Online Testing Platform in React

Online Testing Platform is a platform where candidate can take online quiz and get there result.  This project was done as part of the training process in the company and the main area of focus was learning the basics of react. A lot of time was also invested in UI/UX design :).

## Update

This project was authored 7 years back and since then has not been updated.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### Count Down Timer

The value for countdown timer can be set in the countDownTimer component present in src/components/countDownTimer.js

### Adding more Questions

Currently there are 5 questions in this test. To add more questions append them to the **QUESTIONS** constant present inside src/index.js. Question format should be as shown in the example below-

    {
      id: 4,
      statement: "Capital of Ethiopia",
      options: ['Helsinki', 'Mongadishu', "Addis Ababa", 'Paris'],
       answer: "Addis Ababa"
     }

Also questions should be separated with commas.
Order of questions can also be changed but question id must start with 0 and should be increased by 1 subsequently.

### Deployment

The project has been deployed on Heroku.
<https://online-test-questions.herokuapp.com/>
