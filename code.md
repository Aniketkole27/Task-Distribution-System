# Machine Learning Practicals - Python Implementation

## Practical No. 1: Understanding Python Libraries for Machine Learning

### Overview
Introduction to NumPy, Pandas, and Matplotlib with basic operations.

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# NUMPY FUNCTIONS
print("========== NUMPY FUNCTIONS ==========")

arr = np.array([10, 20, 30, 40, 50])
print(f"Array: {arr}, Shape: {arr.shape}, Dimension: {arr.ndim}")
print(f"Mean: {np.mean(arr)}, Sum: {np.sum(arr)}, Std: {np.std(arr)}")

# Matrix Operations
matrix = np.array([[1,2],[3,4]])
print(f"Matrix:\n{matrix}\nTranspose:\n{matrix.T}")

# PANDAS FUNCTIONS
print("\n========== PANDAS FUNCTIONS ==========")

data = {
    'Name': ['Ram', 'Sham', 'Sita', 'Gita'],
    'Marks': [85, 78, 92, 88],
    'City': ['Pune', 'Mumbai', 'Nashik', 'Nagpur']
}
df = pd.DataFrame(data)
print(f"DataFrame Shape: {df.shape}")
print(f"Max Marks: {df['Marks'].max()}, Mean: {df['Marks'].mean()}")

# MATPLOTLIB FUNCTIONS
print("\n========== MATPLOTLIB FUNCTIONS ==========")

x = [1, 2, 3, 4, 5]
y = [10, 20, 30, 40, 50]

plt.figure(figsize=(10, 6))
plt.subplot(2, 2, 1)
plt.plot(x, y, marker='o', color='blue')
plt.title("Line Graph")
plt.grid(True)

plt.subplot(2, 2, 2)
plt.bar(x, y, color='green')
plt.title("Bar Graph")

plt.subplot(2, 2, 3)
plt.scatter(x, y, color='red')
plt.title("Scatter Plot")

plt.subplot(2, 2, 4)
plt.pie([25, 30, 20, 25], labels=['A', 'B', 'C', 'D'], autopct='%1.1f%%')
plt.title("Pie Chart")

plt.tight_layout()
plt.show()
```

---

## Practical No. 2: Data Preprocessing Techniques

### Overview
Handling missing values, normalization, standardization, and outlier detection.

```python
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler, StandardScaler
from sklearn.decomposition import PCA

# Create Dataset
data = {
    "Name": ["Ganesh", "Aniket", "Shubham", "Ganesh", "Manesh"],
    "Marks": [21, 54, 66, 21, np.nan],
    "Age": [21, 22, 23, 21, 23],
    "City": ["Pune", "Mumbai", "Nagpur", "Pune", "Delhi"]
}

df = pd.DataFrame(data)
print("Original Data:\n", df)

# Remove Duplicates
df = df.drop_duplicates()
print("\nAfter Removing Duplicates:\n", df)

# Handle Missing Values
df["Marks"] = df["Marks"].fillna(df["Marks"].mean())

# Normalization
scaler = MinMaxScaler()
df["Marks_Normalized"] = scaler.fit_transform(df[["Marks"]])

# Standardization
std_scaler = StandardScaler()
df["Marks_Standardized"] = std_scaler.fit_transform(df[["Marks"]])

# Outlier Detection using IQR
Q1 = df["Marks"].quantile(0.25)
Q3 = df["Marks"].quantile(0.75)
IQR = Q3 - Q1
df = df[(df["Marks"] >= Q1 - 1.5 * IQR) & (df["Marks"] <= Q3 + 1.5 * IQR)]

print("\nFinal Preprocessed Data:\n", df)
```

---

## Practical No. 3: Exploratory Data Analysis

### Overview
Statistical measures and visualization of data relationships.

```python
import pandas as pd
import numpy as np
import statistics
import seaborn as sns
import matplotlib.pyplot as plt

# Create Dataset
data = {
    "Name": ["Ganesh", "Aniket", "Manesh", "Shubham", "Shailesh", 
             "Sushil", "Sneha", "Pooja", "Priya", "Kavita"],
    "Age": [21, 23, 24, 22, 25, 26, 22, 24, 23, 25],
    "Salary": [20000, 22000, 25000, 24000, 26000, 28000, 23000, 24000, 23500, 25500],
    "Department": ["IT", "HR", "Finance", "IT", "HR", "Finance", "IT", "Finance", "HR", "IT"],
    "Gender": ["M", "M", "M", "M", "M", "M", "F", "F", "F", "F"]
}

df = pd.DataFrame(data)

# Central Tendency Measures
print("Mean Salary:", df["Salary"].mean())
print("Median Salary:", df["Salary"].median())
print("Variance:", df["Salary"].var())
print("Std Dev:", df["Salary"].std())

# Visualization
plt.figure(figsize=(12, 4))

plt.subplot(1, 3, 1)
sns.histplot(df["Salary"], kde=True)
plt.title("Salary Distribution")

plt.subplot(1, 3, 2)
sns.barplot(x="Department", y="Salary", data=df)
plt.title("Avg Salary by Department")

plt.subplot(1, 3, 3)
corr_matrix = df[["Age", "Salary"]].corr()
sns.heatmap(corr_matrix, annot=True, cmap="coolwarm")
plt.title("Correlation")

plt.tight_layout()
plt.show()
```

---

## Practical No. 4: Simple Linear Regression

### Overview
Predicting disease progression using single feature regression.

```python
import matplotlib.pyplot as plt
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

# Load Dataset
data = load_diabetes()
X = data.data[:, [2]]
y = data.target

# Split Dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and Train Model
model = LinearRegression()
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Metrics
print(f"Slope: {model.coef_[0]:.4f}")
print(f"Intercept: {model.intercept_:.4f}")
print(f"R2 Score: {r2_score(y_test, y_pred):.4f}")
print(f"MSE: {mean_squared_error(y_test, y_pred):.4f}")

# Visualization
plt.figure(figsize=(10, 5))
plt.scatter(X_test, y_test, color='blue', label='Actual')
plt.plot(X_test, y_pred, color='red', linewidth=2, label='Regression Line')
plt.xlabel("BMI")
plt.ylabel("Disease Progression")
plt.title("Simple Linear Regression")
plt.legend()
plt.grid(True)
plt.show()
```

---

## Practical No. 5: Multiple Linear Regression

### Overview
House price prediction using multiple features.

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error

# Create Dataset
data = {
    "Area": [1000, 1200, 1500, 1800, 2000, 2200, 2500, 2700, 3000, 3200],
    "Bedrooms": [2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
    "Bathrooms": [1, 2, 2, 2, 3, 3, 4, 4, 5, 5],
    "Price": [2000000, 2500000, 3000000, 3500000, 4000000, 4500000, 5000000, 5500000, 6000000, 6500000]
}

df = pd.DataFrame(data)
X = df[["Area", "Bedrooms", "Bathrooms"]]
y = df["Price"]

# Split and Train
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

print(f"R2 Score: {r2_score(y_test, y_pred):.4f}")
print(f"RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):.2f}")

# Predict New House
new_house = pd.DataFrame({"Area": [2400], "Bedrooms": [4], "Bathrooms": [3]})
print(f"Predicted Price: {model.predict(new_house)[0]:,.0f}")

# Visualization
plt.figure(figsize=(10, 5))
plt.scatter(y_test, y_pred, color='blue')
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=2)
plt.xlabel("Actual Price")
plt.ylabel("Predicted Price")
plt.title("Actual vs Predicted Price")
plt.grid(True)
plt.show()
```

---

## Practical No. 6: Naive Bayes Classification

### Overview
Iris flower classification using Naive Bayes algorithm.

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

# Load Dataset
iris = load_iris()
X = iris.data
y = iris.target

# Split and Train
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = GaussianNB()
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"Accuracy: {accuracy:.4f}")
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Confusion Matrix Visualization
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(6, 5))
sns.heatmap(cm, annot=True, fmt='d', cmap="Blues")
plt.title("Confusion Matrix")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.show()
```

---

## Practical No. 7: K-Nearest Neighbor (K-NN)

### Overview
Digit classification using K-NN algorithm.

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Load Dataset
data = load_digits()
X = data.data
y = data.target

# Split and Train
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = KNeighborsClassifier(n_neighbors=3)
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"Accuracy: {accuracy:.4f}")

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap="Blues")
plt.title("K-NN Confusion Matrix")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.show()
```

---

## Practical No. 8: Logistic Regression

### Overview
Binary classification for diabetes prediction.

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import seaborn as sns

# Load Dataset
data = load_diabetes()
X = data.data
y = np.where(data.target > data.target.mean(), 1, 0)  # Binary classification

# Standardization
scaler = StandardScaler()
X = scaler.fit_transform(X)

# Split and Train
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"Accuracy: {accuracy:.4f}")
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(6, 5))
sns.heatmap(cm, annot=True, fmt='d', cmap="Blues")
plt.title("Logistic Regression - Confusion Matrix")
plt.show()
```

---

## Practical No. 9: Support Vector Machine (SVM)

### Overview
Breast cancer classification using SVM with Grid Search.

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Load Dataset
data = load_breast_cancer()
X = data.data
y = data.target

# Standardization
scaler = StandardScaler()
X = scaler.fit_transform(X)

# Split Dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Grid Search
param_grid = {'C': [0.1, 1, 10], 'gamma': [1, 0.1, 0.01], 'kernel': ['linear', 'rbf']}
grid = GridSearchCV(SVC(), param_grid, cv=5)
grid.fit(X_train, y_train)

# Best Model
y_pred = grid.best_estimator_.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"Best Parameters: {grid.best_params_}")
print(f"Accuracy: {accuracy:.4f}")

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(6, 5))
sns.heatmap(cm, annot=True, fmt='d', cmap="Blues")
plt.title("SVM - Confusion Matrix")
plt.show()
```

---

## Practical No. 10: K-Means Clustering

### Overview
Customer segmentation using K-Means clustering on Iris and Mall Customer datasets.

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_iris
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# Load Iris Dataset
iris = load_iris()
data = pd.DataFrame(iris.data, columns=iris.feature_names)

# Select Features
X = data[["sepal length (cm)", "petal length (cm)"]]

# Standardization
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Create K-Means Model
kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
clusters = kmeans.fit_predict(X_scaled)

# Visualization
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.scatter(X_scaled[:, 0], X_scaled[:, 1], c=clusters, cmap='viridis', s=50)
plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1], 
            s=200, c='red', marker='X', label='Centroids')
plt.xlabel("Sepal Length")
plt.ylabel("Petal Length")
plt.title("K-Means Clustering (Iris)")
plt.legend()
plt.grid(True)

plt.subplot(1, 2, 2)
sns.countplot(x=clusters)
plt.title("Cluster Distribution")
plt.xlabel("Cluster")
plt.ylabel("Count")

plt.tight_layout()
plt.show()

print(f"Inertia: {kmeans.inertia_:.2f}")
```

---

## Notes
- All practicals are optimized for quick execution
- Ensure you have required libraries: `numpy`, `pandas`, `matplotlib`, `seaborn`, `scikit-learn`, `scipy`
- Install with: `pip install numpy pandas matplotlib seaborn scikit-learn scipy`
