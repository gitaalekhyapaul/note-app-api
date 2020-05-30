# API Documentation [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Routes Available:

### Un-authenticated Routes:

- [**/api/auth/signup**]() **=> POST Route to Signup New Users**
- [**/api/auth/login**]() **=> POST Route to Login**

### Authenticated Routes (Requires Auth Headers as mentioned [here]()):

- [**/api/notes/add**]() **=> POST Route to Add New Notes**
- [**/api/notes/getAll**]() **=> GET Route to get all Notes created by that User**
- [**/api/notes/get?id=[Note ID]**]() **=> GET Route to get details of a certain Note**
- [**/api/notes/update**]() **=> POST Route to Update a Note**
- [**/api/notes/delete**]() **=> POST Route to Delete a Note**

---

## Un-authenticated Routes

### **1. /api/auth/signup => POST Route**

**_Parameters:_**
|Parameter Name|Required|Type|
|--|--|--|
|**username**|Yes|String(Max 20 Characters)|
|**password**|Yes|String|
**_Response JSON:_**

```
{
   "status": "OK" or "ERROR",
   "error": <Error Message if any>
}
```

**_Status Codes and Errors:_**
|Status Codes|Error Message|Reason|
|--|--|--|
|200|-|No Error. User created successfully.|
|400|Username exists.|Tried to create duplicate user.|
|400|Bad Request. Invalid Parameters.|Either the _username_ or _password_ fields are empty|
|500|Internal Server Error.|Some server-side error has occurred.|

---

### **2. /api/auth/login => POST Route**

**_Parameters:_**
|Parameter Name|Required|Type|
|--|--|--|
|**username**|Yes|String(Max 20 Characters)|
|**password**|Yes|String|
**_Response JSON:_**

```
{
   "status": "OK" or "ERROR",
   "error": <Error Message if any>,
   "authToken": <JWT if successfully logged in>
}
```

**_Status Codes and Errors:_**
|Status Codes|Error Message|Reason|
|--|--|--|
|200|-|No Error. User logged in successfully.|
|400|Bad Request. Invalid Parameters.|Either the _username_ or _password_ fields are empty|
|403|Username or Password Wrong.|Login credentials are invalid.|
|500|Internal Server Error.|Some server-side error has occurred.|

---

## Authenticated Routes:

**_Headers which should be present:_**
|Header|Format|Type|
|--|--|--|
|Authorization|**Bearer [Token]**|A JWT Bearer Token|
**_Auth Errors:_**
|Status Codes|Error Message|Reason|
|--|--|--|
|401|Invalid Credentials. Please Login.|Invalid or Expired JWT|
|500|Internal Server Error.|Some server-side error has occurred.|
**_Invalid Auth Response:_**

```
{
   "status": "ERROR",
   "error": <Error Message>
}
```

---

### **1. /api/notes/add => POST Route**

**_Parameters:_**
|Parameter Name|Required|Type|
|--|--|--|
|**title**|Yes|String|
|**content**|Yes|String|
**_Response JSON:_**

```
{
   "status": "OK" or "ERROR",
   "error": <Error Message if any>
}
```

**_Status Codes and Errors:_**
|Status Codes|Error Message|Reason|
|--|--|--|
|200|-|No Error.|
|400|Bad Request. Invalid Parameters.|Either the _title_ or _content_ fields are empty|
|500|Internal Server Error.|Some server-side error has occurred.|

---

### **2. /api/notes/getAll => GET Route**

**_Response JSON:_**

```
{
   "status": "OK" or "ERROR",
   "error": <Error Message if any>
   "data": [
	   {
	      "id":<Note ID>,
	      "author":"<Username>",
	      "title":"<Title of the Note>",
	      "content":"<Content of the Note>",
	      "create_time":"<Note Create Time in httpDate Format>",
	      "edited":<Edit Status: 0 for unedited Note, 1 for edited Note>,
	      "update_time":"<Note Edit Time in httpDate Format>"
           },
	   <Other Notes also>
   ]
}
```

**_Status Codes and Errors:_**
|Status Codes|Error Message|Reason|
|--|--|--|
|200|-|No Error.|
|404|No Notes Found.|User has no Notes.|
|500|Internal Server Error.|Some server-side error has occurred.|

---

### **3. /api/notes/get?id=[Note ID] => GET Route**

**_Query Parameters:_**
|Query Parameter|Description|
|--|--|
|**id**|The specific Note ID|
**_Response JSON:_**

```
{
   "status": "OK" or "ERROR",
   "error": <Error Message if any>
   "data": {
	      "id":<Note ID>,
	      "author":"<Username>",
	      "title":"<Title of the Note>",
	      "content":"<Content of the Note>",
	      "create_time":"<Note Create Time in httpDate Format>",
	      "edited":<Edit Status: 0 for unedited Note, 1 for edited Note>,
	      "update_time":"<Note Edit Time in httpDate Format>"
           }
}
```

**_Status Codes and Errors:_**
|Status Codes|Error Message|Reason|
|--|--|--|
|200|-|No Error.|
|404|No Notes Found.|Note with the specified ID not found.|
|500|Internal Server Error.|Some server-side error has occurred.|

---

### **4. /api/notes/update => POST Route**

**_Parameters:_**
|Parameter Name|Required|Type|
|--|--|--|
|**id**|Yes|String|
|**title**|Yes|String|
|**content**|Yes|String|
**_Response JSON:_**

```
{
   "status": "OK" or "ERROR",
   "error": <Error Message if any>
}
```

**_Status Codes and Errors:_**
|Status Codes|Error Message|Reason|
|--|--|--|
|200|-|No Error.|
|400|Bad Request. Invalid Parameters.|Either the _id_, _title_ or _content_ fields are empty|
|404|No Notes Found.|User does not have a note with that ID.|
|500|Internal Server Error.|Some server-side error has occurred.|

---

### **4. /api/notes/delete => POST Route**

**_Parameters:_**
|Parameter Name|Required|Type|
|--|--|--|
|**id**|Yes|String|
**_Response JSON:_**

```
{
   "status": "OK" or "ERROR",
   "error": <Error Message if any>
}
```

**_Status Codes and Errors:_**
|Status Codes|Error Message|Reason|
|--|--|--|
|200|-|No Error.|
|400|Note ID Missing.|The _id_ field is empty|
|404|No Notes Found.|User does not have a note with that ID.|
|500|Internal Server Error.|Some server-side error has occurred.|

---

## Technology Stack Used:

- Amazon RDS MySQL
- Heroku
- Express
- Node

# Project Contributors:

- [**Gita Alekhya Paul**](https://github.com/gitaalekhyapaul)  
  **If you like what you have seen, kindly star the repository!**
