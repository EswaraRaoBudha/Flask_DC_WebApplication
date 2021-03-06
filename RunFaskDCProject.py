from flask import Flask, render_template,request,session,flash,redirect,url_for
from functools import wraps
import sqlite3
import pandas as pd

app = Flask(__name__)
######### Create InMemory DB in SQLite ############
conn=sqlite3.connect(':memory:',check_same_thread=False)
c=conn.cursor()
c.execute("""create table login_users (username text,password text,email text)""")
c.execute("""INSERT INTO login_users values ('admin','admin','admin@myflask.com')""");
conn.commit
######### Create Table for Cars Data Set###############
c.execute("""create table CARS_CLASSFICATION (CAR TEXT,MPG  REAL,CYLINDERS INTEGER,DISPLACEMENT REAL,HORSEPOWER REAL,WEIGHT REAL,	ACCELERATION REAL,MODEL INTEGER,ORIGIN TEXT)""")
conn.commit;
df = pd.read_csv('cars1.csv')
df.to_sql('CARS_CLASSFICATION', conn, if_exists='append', index=False)
c.execute('SELECT * from CARS_CLASSFICATION')
data = c.fetchall()

#### Login Code ###########
def login_validate(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_status' in session:
            return f(*args, **kwargs)
        else:
            flash('You Must Login')
            return redirect(url_for('login_index'))
    return wrap

@app.route('/')
def login_index():
    if not session.get('logged_status'):
        return render_template('login_index.html')
    else:
        return home()

@app.route('/home')
@login_validate
def home():
      return render_template('dashboard.html')

@app.route('/user_details')
@login_validate
def user_details():
      return render_template('user.html')
	  
@app.route('/signup', methods=['POST'])
def signup():
	v_username =request.form['user_reg'];
	v_pass =request.form['pass_reg'];
	v_pass_rep =request.form['pass_reg_rep'];
	v_email_req =request.form['email_reg'];
	c.execute("""INSERT INTO login_users values (?,?,?)""",(v_username,v_pass,v_email_req));
	conn.commit;
	print(v_username,v_pass,v_pass_rep);
	return "Hello"

@app.route('/signin', methods=['POST'])
def signin():
	v_username =request.form['user_login'];
	v_password = request.form['pass_login'];
	v_check_status=request.form['check_login'];
	print(v_username,v_password,v_check_status);
	c.execute('SELECT * from login_users WHERE email=? AND password=?',(v_username,v_password))
	data = c.fetchall()
	var =  int(len(data))
	print(var)
	if var >= 1:
		print("login successfull")
		session['logged_status'] = True
		session['user_name'] = v_username
	else:
		flash('Invalid username or password. Please try again!')
	return login_index()

@app.route("/signout")
def signout():
    session['logged_status'] = False
    return login_index()

@app.route('/getData')
@login_validate
def getData():
	conn.commit;
	c.execute('SELECT * from login_users')
	data = c.fetchall()
	print (data)    
@app.route('/getCarsData')
@login_validate
def getCarsData():
	query="""SELECT * from CARS_CLASSFICATION"""
	cs_df = pd.read_sql(query, con=conn)
	jcs_df=cs_df.to_json(orient='records')
	return jcs_df
if __name__ == '__main__':
	app.secret_key = "MyFlaskProject";
	app.run(debug=True)

