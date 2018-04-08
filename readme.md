# DC.js Web Application with Flask 

The point of this project is sharing learning on building the DC web application with Flask (python web Service), used DC.js for rich look for interactive diagrams Dashboard and we used  SQLite in-memory Database storage for  storing example data. 
# Requirements!

  - python 3.6.2 
  - required modules are flask, functools, sqlite3

on the off chance that you don't have above modules in your machine, you can
install using pip introduce. 

# Getting Started of Project.
in this Project we have two pages, one is Sign up/Sign in page and other one is Dashboard page

- Sign Up /Sign in page: 
we create a login_users table in SQLite DB while loading python content alongside admin as the default user. 

> Note: it's in Memory DB, so in the event that you restart the application, you will lose made users so you can use any DB which you are interested. Point of this task is, run the project  without having various installations.  

- Dashboard Page : 
we load the sample Cars dataset into CARS_CLASSFICATION table while loading Python Script and made interactive graphs/diagrams  with DC.js. 

## Installation: 
- clone the project on your machine
> Note: in the event that you don't have above modules in your machine, you can use  pip install and also you can install python using Anaconda tool. 

## Running Application. 
follow the below steps to run the code
- go the directory at the command level
    ```sh
    cd C:\Git\MyFirstProject\Flask Project
    ``` 
- run the  RunFaskDCProject.py 
    ```sh
    python RunFaskDCProject.py 
    ``` 
    > Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
- Use this URL http://127.0.0.1:5000/on a web browser to get login page and you can pass admin@myflask.com / admin or you can set up your User

## Break down into the end to end coding.
- Sign In/Sign up Page: 
    - Python Code: 
    you can see python code in RunFaskDCProject.py 
        - [ /Signup,/signin,/signout ]: 
            code for user enrollment and approval
        - [login_validate]:
            function to validate the user login status before going launch the page.
     - 	Html code: 
        Html Code for Signup and Signin Page. 
        - login_index.html 

- Dashboard page. 
    Cars Data represnation in [DC.js]() Charts.
    - Python Code: 
    you can see python code in RunFaskDCProject.py
         - /getCarsData:
        get Data for cars from SQLite DB. 
    - DC.js Code. 
        - car_dashboard.js: 
            you can see the code for how to draw DC charts and DC chart names are below.
		- ORIGIN_DIMPIE
		- HORSEPOWER_DimDonut 
		- CYLINDERS_Bar 

> Note: we need to add above ids for **div** tag in html page where you want to attach DC charts. for this example, we added charts in dashboard.html

## Authors
**_Eswara Rao Budha_**

License
----

MIT

**Free Software!**
 