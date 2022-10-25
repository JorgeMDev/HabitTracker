from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import DATABASE, app
from flask_app.models import user_model
from flask import  request

class Habit:
    def __init__(self,data):
        self.id = data['id']
        self.name = data['name']
        self.description = data['description']
        self.streak = data['streak']
        self.user_id = data['user_id']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']


    @classmethod
    def get_all(cls):
        query = "SELECT * FROM habits JOIN users ON users.id = habits.user_id;"
        results = connectToMySQL(DATABASE).query_db(query)
        print(results)
        if results:
            all_habits = []
            for row in results:
                this_habit = cls(row) 
                user_data = {
                    **row,
                    'id' : row['users.id'],
                    'created_at': row['users.created_at'],
                    'updated_at':row['users.updated_at']
                }
                this_user = user_model.User(user_data)
                this_habit.habit_user = this_user
                all_habits.append(this_habit) 
            return all_habits
        return results

    @classmethod
    def save(cls, data):
        print(data)
        query = "INSERT INTO habits (name,description,streak, user_id) VALUES (%(name)s,%(description)s,%(streak)s,%(user_id)s);"
        # comes back as the new row id
        result = connectToMySQL(DATABASE).query_db(query,data)
        return result

    @classmethod
    def update(cls,data):
        query = "UPDATE habits SET streak = %(streak)s WHERE id = %(id)s"
        result = connectToMySQL(DATABASE).query_db(query,data)
        print(result)
        return result

    @classmethod
    def destroy(cls,data):
        query  = "DELETE FROM habits WHERE id = %(id)s;"
        return connectToMySQL(DATABASE).query_db(query,data)

 

    
    @classmethod
    def get_by_id(cls,data):
        query = "SELECT * FROM habits WHERE id = %(id)s;"
        result = connectToMySQL(DATABASE).query_db(query,data)
        # Didn't find a matching user
        if len(result) < 1:
            return False
        return result[0]

    @classmethod
    def sum_amount(cls):
        query  = "SELECT SUM(amount) FROM orders WHERE id > 0;"
        result = connectToMySQL(DATABASE).query_db(query)
        print(result)
        return result[0]['SUM(amount)'] 
    
    @classmethod
    def pending_orders(cls):
        query  = "SELECT COUNT(id) FROM orders WHERE status = 'pending';"
        result = connectToMySQL(DATABASE).query_db(query)
        print(result)
        return result[0]['COUNT(id)'] 

