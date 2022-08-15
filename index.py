from flask import Flask, render_template, request, jsonify
from minizinc import Instance, Model, Solver

import matplotlib.pyplot as plt
import base64
from io import BytesIO
import numpy as np
import json
import os

app = Flask(__name__)

@app.route('/')
def principal():
    return render_template('index.html')

@app.route('/plano', methods=['POST'])
def plano():
    min = float(request.form['min'])
    max = float(request.form['max'])
    puntos = json.loads(request.form['puntos'])

    fig = plt.figure()
    #plot sth

    #x = np.arange(min, max)
    # y sera nuestra ecuación lineal
    #y = 2*x + 3

    #Los metodos axhline y axvline generan las lineas negras en forma de cruz
    plt.axhline(0, color="black")
    plt.axvline(0, color="black")

    #Agregamos los datos de x e y en el grafico y luego lo mostramos
    for punto in puntos:
        plt.plot(punto[0], punto[1], marker="o", color="red")

    tmpfile = BytesIO()
    fig.savefig(tmpfile, format='png')
    encoded = base64.b64encode(tmpfile.getvalue()).decode('utf-8')

    html = '<img src=\'data:image/png;base64,{}\'>'.format(encoded)
    return jsonify(html)
@app.route('/crear_file_modelo' , methods=['POST'])
def crear_file_modelo():
    n = int(request.form['size'])
    m = n
    puntos = request.form['puntos']

    file = open("datos_modelo.dzn", "w")
    file.write("n = " + str(n) + ';')
    file.write("m = " + str(m) + ';')
    file.write("ciudades = [" + puntos + '];')
    file.close()

    return '0'

@app.route('/ejecutar_modelo' , methods=['POST'])
def ejecutar_modelo():
    solverToUse = "gecode"
    solver = Solver.lookup(solverToUse)
    model = Model("modelo.mzn")
    model.add_file("datos_modelo.dzn")
    instance = Instance(solver, model)
    #print(instance.method)
    result = instance.solve()

    return str(result)

if __name__ == '__main__':
    app.run(debug=True)