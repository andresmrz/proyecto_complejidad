from minizinc import Instance, Model, Solver
solverToUse = "gecode"
solver = Solver.lookup(solverToUse)
print(solver.name, ",", solver.version)
model = Model("modelo.mzn")
model.add_file("Trivial1.dzn")
instance = Instance(solver, model)
print(instance.method)
result=instance.solve()
print(result)