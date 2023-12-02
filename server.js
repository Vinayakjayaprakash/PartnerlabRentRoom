const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const usersFilePath = 'users.json';
const reservationsFilePath = 'reservations.json';

/*






app.get('/reservations/user/:username', (req, res) => {
  const { username } = req.params;
  const reservations = readJsonFile(reservationsFilePath);
  const userReservation = reservations.find(r => r.username === username);
  res.json(userReservation || {});
});

// Get list of reservations for all users
app.get('/reservations', (req, res) => {
  const reservations = readJsonFile(reservationsFilePath);
  res.send(reservations);
});



// Update a reservation for a user
app.put('/reservations/:username', (req, res) => {
  const { username } = req.params;
  const reservations = readJsonFile(reservationsFilePath);
  const index = reservations.findIndex(r => r.username === username);
  if (index === -1) {
    return res.status(404).send('Reservation not found');
  }
  reservations[index] = { ...reservations[index], ...req.body };
  writeJsonFile(reservationsFilePath, reservations);
  res.send('Reservation updated');
});

// Delete a reservation for a user
app.delete('/reservations/:username', (req, res) => {
  const { username } = req.params;
  let reservations = readJsonFile(reservationsFilePath);
  reservations = reservations.filter(r => r.username !== username);
  writeJsonFile(reservationsFilePath, reservations);
  res.send('Reservation deleted');
});
*/
//gets all reservations
app.get('/reservations', (req, res) => {
  fs.readFile(reservationsFilePath, (err, data) => {
    if (err) {
      throw err;
    }
    let info = JSON.parse(data);
    res.send(info);
  });
});

// Retrieve reservation for a user
//start of get specific user 
app.get('/reservations/user/:user', (req, res) => {
    let user = req.params.user;

    fs.readFile(reservationsFilePath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        const info = JSON.parse(data);
        let userReservationFound = false;

        info.forEach(element => {
            if (element.Name === user) {
                userReservationFound = true;
                res.send(element);
                return; // Return statement to prevent further iterations
            }
        });

        if (!userReservationFound) {
            res.send('[{"Name":"User Not Found", "Time":"0000"}]');
        }
    });
});



app.post('/users', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
       // console.error('Error adding user:', err);
        const users = await readJsonFile(usersFilePath);
        const { username } = req.body;

        if (users.find(user => user.username === username)) {
            return res.status(409).send('Username already exists');
        }

        users.push({ username });
        await writeJsonFile(usersFilePath, users);
        res.status(200).send('User added');
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).send('Internal server error' + err);
    }
});


// Create a reservation for a user
app.post('/reservations', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        const reservations = await readJsonFile(reservationsFilePath);
        const users = await readJsonFile(usersFilePath);
        const { username, startDate, startTime, hours } = req.body;
        console.log(req.body)
        if (!Array.isArray(users)) {
            console.error('Invalid data format for users:', users);
            return res.status(500).send('Internal Server Error');
        }
        console.log(username);
        const userExists = users.find(u => u.username === username);

        if (userExists) {
            const hasReservation = reservations.find(r => r.username === username);

            if (hasReservation) {
                return res.status(409).send('User already has a reservation');
            } else {
                reservations.push({ username, startDate, startTime, hours });
                await writeJsonFile(reservationsFilePath, reservations);
                return res.status(200).send('Reservation created');
            }
        } else {
            console.log('User Not Registered:');
            return res.status(404).send('User Not Registered');
        }
    } catch (error) {
        console.error('Error processing reservation:', error);
        return res.status(500).send('Internal Server Error');
    }
});







// Helper function to read data from a JSON file
async function readJsonFile(filePath) {
    if (!fs.existsSync(filePath)) {
        return [];
    }

    const data = await fs.readFileSync(filePath);
    return JSON.parse(data);
}

// Helper function to write data to a JSON file asynchronously
async function writeJsonFile(filePath, data) {
    await fs.writeFileSync(filePath, JSON.stringify(data));
}

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
