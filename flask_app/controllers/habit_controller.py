from flask_app import app
from flask_bcrypt import Bcrypt
from flask import render_template, redirect, request, session, jsonify
from flask_app.models.habit_model import Habit


bcrypt = Bcrypt(app)

#WELCOME ROUTE 

@app.route('/new/habit', methods=['POST'])
def newhabbit():
    print("adding new habit...")
    #Check is logged in
    if not 'user_id' in session:
        return 'Auth', 401
    
    name = request.json.get('name', None)
    
    
    data = { 'user_id' : session['user_id'],
            'name' : name,
            'streak': 0,
            'description': 'new habit'
            
            }
    add_habit = Habit.save(data)
    
    data_id = {'id' : add_habit}
    newHabit = Habit.get_by_id(data_id)
    
  

   
    return newHabit

@app.route('/delete/habit', methods=['POST'])
def deletehabit():
    print("deleting a habit...")
    #Check is logged in
    if not 'user_id' in session:
        return 'Auth', 401
    
    id = request.json.get('id', None)
    
    
    data = { 'id' : id       
            }
    delete_habit = Habit.destroy(data)

    return 'Success'

@app.route('/update/habit', methods=['POST'])
def updatehabit():
    print("adding a habit streak...")
    #Check is logged in
    if not 'user_id' in session:
        return 'Auth', 401
    
    id = request.json.get('id', None)
    
    
    data_id = { 'id' : id       
            }
    
    habit = Habit.get_by_id(data_id)
    
    habit_streak = int(habit['streak'])
    habit_streak += 1
    
    updated_data = {
                    'id': id,
                    'streak' : habit_streak
                    }
    
    updated_habit = Habit.update(updated_data)

    return 'Success'



@app.route('/test')
def test():
    test = 'test'
   
    return 'TEST'






