import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';


function groupsList() {
  return (
    <div className="groupsList">
      <header className="groupsList-header">
        <Navbar />
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    {/* Main Page Divider Table */}
    <table>
    <tr>
      <td>
        {/* Navigation Table */}
        <table>
          <tr>Sentries</tr>
          <tr>Settings</tr>
          <tr>Groups</tr>
        </table>
      </td>
      <td>
        {/* Groups List Table */}
        <table>
          <tr>
            <th>Group Name</th>
            <th>?</th>
            <th>?</th>
            <th>?</th>
          </tr>
          <tr>
            <td>Test</td>
            <td>?</td>
            <td>?</td>
            <td><button>View</button></td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  </div>
  );
}

export default groupsList;
