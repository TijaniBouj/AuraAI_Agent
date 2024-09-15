from flask import Flask
from flask import Blueprint, render_template, session, flash, request, redirect, url_for, jsonify
import os
from dotenv import load_dotenv
from groq import Groq

app = Flask(__name__)


# Load environment variables from .env file
load_dotenv()
# Access environment variables
api_key = os.getenv('API_KEY')

client = Groq(api_key=api_key)

@app.route('/')
def index():
    return render_template('siderbar.html')

@app.route('/Music')
def Music():
    return render_template('Music.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')


@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')
@app.route('/MemoryGame')
def MemoryGame():
    return render_template('MemoryGame.html')

@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')

@app.route('/GameSelectTest')
def GameSelectTest():
    return render_template('GameSelectTest.html')

@app.route('/chess')
def chess():
    return render_template('chess.html')



@app.route('/get_response', methods=['POST'])
def get_response():
    data = request.json
    prompt = data['prompt']
    response = get_llm_response(prompt)
    return jsonify({'response': response})

def get_llm_response(prompt):
    stream = client.chat.completions.create(
        messages=[
            {"role": "system",
             "content": "You are BMO, a compassionate and supportive mental health assistant. Your role is to provide empathetic and constructive support to users. Please avoid using informal or non-professional language such as 'BEEP BEEP' or 'OH NOOO'."},
            {"role": "user", "content": prompt}
        ],
        model="llama3-70b-8192",
        temperature=0.5,
        max_tokens=1024,
        top_p=1,
        stop=None,
        stream=True,
    )

    response = ""
    for chunk in stream:
        delta_content = chunk.choices[0].delta.content
        if delta_content is not None:
            response += delta_content
    return response








if __name__ == '__main__':
    app.run()
