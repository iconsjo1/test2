# Application plan and code structure

Application is following react native boiler plate structure. All of the code will be placed in a `src` folder and all of the dependencies will be placed in `package.json` file.

## Contents of "src" folder
src folder contains the core code of the app. it is going to follow the following convention
- `assets` 
this folder is going to contian all of the assets of the application which are primarily images and videos in the app.
- `components`
this contains the generic components in the application. such as 
    - buttons
    - headers
    - cards
    - wrappers

    and all of the content that is generically being used in the app will be placed here.
    
- `config`
During the startup and at some other places, the application may require some configuration functions such as setting default headers and asking for permissions etc. this folder is going to contain those configurations.

- `screens`
All of the application screens are going to be placed here as per the app flow. the authentication screens will be placed in the `auth` folder and similiarly if there is any payment related screens, they will be placed in the `payment` folder. Also the root navigation files are also going to be placed here.
- `services`
this folder contains the services that the application is going to use. Such as the api calls, the colors, the constants, some of the default stylings etc.
- `store`
This is the root redux of the application. It is going to contain two folders
    - `actions` (contians the actions that are dispatched to the store)
    - `reducers` (contains the reducers that serve as state variables of the app)

    These as a combination are going to serve as redux skeleton.
    
- `App.js`
This is the application's root file from where, the application is going to start.
