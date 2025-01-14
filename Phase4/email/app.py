from flask import Flask, request, jsonify, render_template
from flask_mail import Mail, Message

app = Flask(__name__)

# Configurations for Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'emmaculate.mwikali@student.moringaschool.com'  # Replace with your email
app.config['MAIL_PASSWORD'] = 'wsfy gvyl dmtu jrae'        # Replace with your email password or app-specific password
app.config['MAIL_DEFAULT_SENDER'] =app.config ['MAIL_USERNAME']
# Initialize Mail
mail = Mail(app)

@app.route('/')
def send_email():
    try:
        msg=Message(

            subject="hello ,How are you ...abujubuju!!!",
            sender=app.config['MAIL_USERNAME'],
            recipients=["1samempire@gmail.com"]

        )
        msg.body="hello"
        mail.send(msg)
        return render_template("index.html")
    except Exception as e:
        return f"error occured:{e}"
 
    
@app.route("/")
def home():
    return render_template("index.html")



if __name__ == '__main__':
    app.run("127.0.0.1",5005,debug=True)
