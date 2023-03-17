# CRM system for creating a list of clients

Make sure Node.js version 12 or higher is installed before running.

To start the server, go to the folder with the repository and run the `node index` command.

## Client object structure

```javascript
{
  id: '1234567890',
  createdAt: '2021-02-03T13:07:29.554Z',
  updatedAt: '2021-02-03T13:07:29.554Z',
  name: 'Evan',
  surname: 'Man',
  lastName: 'Fane',
  contacts: [
    {
      type: 'Телефон',
      value: '+71234567890'
    },
    {
      type: 'Email',
      value: 'abc@xyz.com'
    },
    {
      type: 'Facebook',
      value: 'https://facebook.com/vasiliy-pupkin-the-best'
    }
  ]
}
```
