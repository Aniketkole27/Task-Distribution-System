```python
# Practical No. 1
# Understanding Python Libraries for Machine Learning

# Import Libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# NUMPY FUNCTIONS

print("========== NUMPY FUNCTIONS ==========")

# Create Array
arr = np.array([10, 20, 30, 40, 50])

# Display Array
print("\nOriginal Array:")
print(arr)

# Shape
print("\nShape:")
print(arr.shape)

# Dimension
print("\nDimension:")
print(arr.ndim)

# Data Type
print("\nData Type:")
print(arr.dtype)

# Sum
print("\nSum:")
print(np.sum(arr))

# Mean
print("\nMean:")
print(np.mean(arr))

# Median
print("\nMedian:")
print(np.median(arr))

# Standard Deviation
print("\nStandard Deviation:")
print(np.std(arr))

# Maximum
print("\nMaximum:")
print(np.max(arr))

# Minimum
print("\nMinimum:")
print(np.min(arr))

# Square Root
print("\nSquare Root:")
print(np.sqrt(arr))

# Power
print("\nPower:")
print(np.power(arr, 2))

# Addition
print("\nAddition:")
print(arr + 5)

# Multiplication
print("\nMultiplication:")
print(arr * 2)

# Reshape Array
print("\nReshaped Array:")
print(arr.reshape(5,1))

# Matrix Creation
matrix = np.array([[1,2],[3,4]])

# Display Matrix
print("\nMatrix:")
print(matrix)

# Transpose Matrix
print("\nTranspose:")
print(matrix.T)

# PANDAS FUNCTIONS

print("\n========== PANDAS FUNCTIONS ==========")

# Create Dictionary
data = {
    'Name': ['Ram', 'Sham', 'Sita', 'Gita'],
    'Marks': [85, 78, 92, 88],
    'City': ['Pune', 'Mumbai', 'Nashik', 'Nagpur']
}

# Create DataFrame
df = pd.DataFrame(data)

# Display DataFrame
print("\nDataFrame:")
print(df)

# Head Function
print("\nHead:")
print(df.head())

# Tail Function
print("\nTail:")
print(df.tail())

# Shape
print("\nShape:")
print(df.shape)

# Column Names
print("\nColumns:")
print(df.columns)

# Information
print("\nInformation:")
print(df.info())

# Description
print("\nDescription:")
print(df.describe())

# Sorting
print("\nSorted Data:")
print(df.sort_values(by='Marks'))

# Select Column
print("\nMarks Column:")
print(df['Marks'])

# Maximum Marks
print("\nMaximum Marks:")
print(df['Marks'].max())

# Minimum Marks
print("\nMinimum Marks:")
print(df['Marks'].min())

# Average Marks
print("\nAverage Marks:")
print(df['Marks'].mean())

# MATPLOTLIB FUNCTIONS

print("\n========== MATPLOTLIB FUNCTIONS ==========")

# Data
x = [1, 2, 3, 4, 5]
y = [10, 20, 30, 40, 50]

# Line Graph
plt.figure(figsize=(6,4))

plt.plot(
    x,
    y,
    marker='o',
    color='blue'
)

plt.xlabel("X-axis")

plt.ylabel("Y-axis")

plt.title("Line Graph")

plt.grid(True)

plt.show()

# Bar Graph
plt.figure(figsize=(6,4))

plt.bar(
    x,
    y,
    color='green'
)

plt.xlabel("X-axis")

plt.ylabel("Y-axis")

plt.title("Bar Graph")

plt.show()

# Scatter Plot
plt.figure(figsize=(6,4))

plt.scatter(
    x,
    y,
    color='red'
)

plt.xlabel("X-axis")

plt.ylabel("Y-axis")

plt.title("Scatter Plot")

plt.show()

# Pie Chart
labels = ['A', 'B', 'C', 'D']

values = [25, 30, 20, 25]

plt.figure(figsize=(6,6))

plt.pie(
    values,
    labels=labels,
    autopct='%1.1f%%'
)

plt.title("Pie Chart")

plt.show()

# Histogram
data1 = [10,20,20,30,30,30,40,50]

plt.figure(figsize=(6,4))

plt.hist(
    data1,
    bins=5
)

plt.xlabel("Values")

plt.ylabel("Frequency")

plt.title("Histogram")

plt.show()

```
