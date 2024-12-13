import { Devvit, useForm, useState } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
  http:true
});
type PageProps = {
    setPage: (page: string) => void;
  }

// const Leftuserinput = () => {
//     const [name, setName] = useState('unknown');
//   const myForm = useForm(
//     {
//       fields: [
//         {
//           type: 'string',
//           name: 'name',
//           label: 'Name',
//         },
//       ],
//     },
//     (values) => {
//       // onSubmit handler
//       setName(values.name);
//     }
//   );

//   return (
//     <vstack gap="medium" height="100%" alignment="middle center">
//       <text>Hello {name}!</text>
//       <button
//         onPress={() => {
//           context.ui.showForm(myForm);
//         }}
//       >
//         Set name
//       </button>
//     </vstack>
//   );
// }

  export const WarPage = ({ setPage }: PageProps) => {
    return (
      <vstack height="100%" alignment="center" padding="large" gap="medium">
        {/* Title */}
        <text size="large" weight="bold">
          War Page
        </text>
  
        {/* Content */}
        <hstack width="100%" height="100%" gap="large" alignment="center">
          {/* Left Side */}
          <vstack width="50%" height="100%" alignment="center" gap="medium">
          <image url="../../assets/car.jpg" imageWidth={100} imageHeight={100} />
            {/* <input
              type="text"
              placeholder="Enter text for Left User"
              style={{
                width: '80%',
                padding: '10px',
                fontSize: '16px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            /> */}
          </vstack>
  
          {/* Right Side */}
          <vstack width="50%" height="100%" alignment="center" gap="medium">
          <image url="../../assets/chillguy.jpg" imageWidth={100} imageHeight={100} />

            {/* <input
              type="text"
              placeholder="Enter text for Right User"
              style={{
                width: '80%',
                padding: '10px',
                fontSize: '16px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            /> */}
          </vstack>
        </hstack>
        <button onPress={() => setPage('home')}>Go to LandingPage</button>
      </vstack>
    );
  };