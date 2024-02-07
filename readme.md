to start the project:

go to the root directory of the project

npm install

to run:
npx expo start


video Link: https://youtu.be/fU9-dz4v7BU


project development process:
Step 1:
installing React-Native expo app in root directory, Along with firebase
Step2:
Initialize Firebase setup at firebase console, along with set the database and enable email, password authentication.
Step3:
Create FirebaseConfig.ts and submit its FirebaseConfig data in there,
Step4:
Create Login/auth page and Home/dashboard screen, create drawer navigation.
Writing Auth Logic and setup protected route.
step4:
Call FakeStore api in home screen, with axios.with Flatlist show to screen.
step5:
In details Screen show details product and initialize it with asyncStorage to add as favourete 
to get in favourite page
step6: 
create Favourite screen and initialize get function with async storage, make fuction to remove from page.