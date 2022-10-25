from email import message
from flask_app import app
from flask_bcrypt import Bcrypt
from flask import render_template, redirect, request, session, jsonify
from flask_app.models.user_model import User


bcrypt = Bcrypt(app)

#WELCOME ROUTE 

@app.route('/user/habits')
def showuser():
    #Check is logged in
    if not 'user_id' in session:
        return 'Auth', 401
    
    data = { 'id' : session['user_id']}
    user_with_habits = User.user_with_habits(data)
    
    if len(user_with_habits) > 0:
        return user_with_habits
    
    res = []
    
    return res

#Get USER By ID
@app.route('/get/user')
def getuser():
      #Check is logged in
    if not 'user_id' in session:
        return 'Auth', 401
    
    data = { 'id' : session['user_id']}
    user_by_id = User.get_by_id(data)
   
    
    return user_by_id
    

#Registration
@app.route('/registration', methods=['POST'])
def registration():
 
    pw_hash = bcrypt.generate_password_hash(request.json.get('password',None))
    
    data = {
        'first_name':request.json.get('first_name', None),
        'last_name':request.json.get('last_name', None),
        'email': request.json.get('email',None),
        'password': pw_hash
    }
    
    #else no errors:
    session['user_id'] = User.save(data)
    return 'Success'

#Login route

@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
   
 
    # see if the username provided exists in the database
    data = { "email" : email }
    user_in_db = User.get_by_email(data)
    # # user is not registered in the db
    
    if not user_in_db:
        return "Invalid email/password", 403

    if not bcrypt.check_password_hash(user_in_db.password, password):
    # #     # if we get False after checking the password
        return "Invalid Email/Password", 403

    
    # # if the passwords matched, we set the user_id into session
    session['user_id'] = user_in_db.id
    print(session)
    # never render on a post!!!

    return 'Success', 200
 

#LOGOUT ROUTE
@app.route('/logout')
def logout():
    del session['user_id']
   
    return redirect('/')

