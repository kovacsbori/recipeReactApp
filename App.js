import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SimpleLineIcons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import RecipeListScreen from './screens/RecipeListScreen';
import MyPage from './screens/MyPage';
import { createTable, dropTable } from './utils/SQLiteUtils';
import { insertTestData } from './utils/testData';
import { UserProvider } from './UserContext';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: '#101010'
      }}>
      <Tab.Screen
        name="Recipes"
        component={RecipeListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name='notebook' color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="My recipes"
        component={MyPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name='heart' color={color} size={size} />
          )
        }} />
    </Tab.Navigator>
  );
}


const Stack = createStackNavigator();

export default function App() {
  console.log("App starting")
  dropTable('recipes');
  dropTable('likes');
  createTable('recipes', 'id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, ingredients TEXT, description TEXT, imageURL TEXT');
  createTable('likes', 'userId INTEGER NOT NULL, recipeId INTEGER NOT NULL, PRIMARY KEY (userId, recipeId)');
  createTable('users', 'userId INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, password TEXT NOT NULL');
  insertTestData();

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              title: 'Login',
              headerShown: false
            }} />
          <Stack.Screen
            name="RecipeListScreen"
            component={TabNavigator}
            options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}