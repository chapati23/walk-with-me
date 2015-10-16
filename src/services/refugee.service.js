class RefugeeService {
    constructor() {
        this.refugees = [
            {
                id: 1,
                name: 'Zahira',
                sex: 'female',
                age: 39,
                homeCountry: 'Syria',
                homeTown: 'Aleppo',
                currentCountry: 'Germany',
                currentCity: 'Berlin',
                kmTraveled: 2594,
                stepsTraveled: 3242500,
                mapUrl: 'map-aleppo-to-berlin.gif',
                imgUrl: 'zahira.jpg',
                story: {
                    whereAreYouFrom: `
                    <p>I was born and raised in Aleppo, a big city in North-West Syria where I've lived my entire live. After high school I met my husband, and we got married shortly after. He was a very successful industrial electrician, and frequently travelled to Germany and Austria for business while I stayed at home and took care of our two wonderful daughters. </p>
                    <p>Things were great before the war. My husband's business was doing very well, and I loved making dresses and colourful clothes for my daughters, which they loved. Sew and knitting clothes is my passion, and if I wasn't busy raising our daughters I would probably be a fashion designer!</p>
                    `,
                    whyDidYouLeave: `
                    <p>The war began, and everything changed. At first we didn't think it would affect us, but then one day our town was attacked by multiple militia groups - including thousands of rebel fighters from ISIS. Then the army began fighting back, firing rockets and dropping bombs. Our city turned into a warzone.</p>
                    <p>I decided we were no longer safe, and took the children and we packed a small bag. My husband was too proud to leave though. He said, &quot;I am NOT going to leave my country to seek asylum anywhere.&quot;</p>
                    `,
                    howDidYouTravel: `
                    <p>We escaped town and found our way to a convoy of cars all going in the same direction. We arrived at the border town and paid a group of people to get us out of the country. It took us 10 hours in an overcrowded car, into Turkey, and then to the Turkish-Bulgarian border. They dropped us off near the border crossing and then we walked for over 400 kilometres though the trees and thick bushes all the way to Serbia. </p>
                    <p>From Serbia we made our way to Hungary in the back of another car, West through Austria to the German border. They left us at the border to find our own way from there.</p>
                    <p>I will never forget this journey. While walking through the forest we were almost captured by police, and in all the panic and confusion my daughter and I were separated. It was the worst feeling I have ever felt - for 12 hours I searched for her, screaming until my lungs were sore. When I eventually found her I could do nothing but thank God for returning her to me.</p>
                    <p>One of the last things my husband said to me was that if we could make our way to Germany we should try our best to get to Berlin, because it's more liberal than Munich and he had good memories from his business trips.</p>
                    `,
                    whatDoYouWishFor: `
                    <p>Since we arrived here in Berlin everybody we've encountered has been friendly. I have nothing but gratitude for the people of Germany for the wonderful treatment my children and I have received so far. It's funny, it feels like here we are treated better than we were treated in our own country.</p>
                    <p>I hope that one day I will be reunited with my husband, and we will have the third child we always wanted... a boy. I want peace for Syria, and to one day return home. I want to see my children grow up in their motherland, free from war and conflict.</p>
                    `
                }
            },
            {
                id: 2,
                name: 'Hamada',
                sex: 'male',
                age: 29,
                homeCountry: 'Egypt',
                homeTown: 'Cairo',
                currentCountry: 'Germany',
                currentCity: 'Berlin',
                kmTraveled: 3144,
                stepsTraveled: 3930000,
                mapUrl: 'map-cairo-to-berlin.gif',
                imgUrl: 'hamada.jpg',
                story: {
                    whereAreYouFrom: `<p>I was a bodybuilder - one of the best in my country. I finished 1st and 2nd place in two national bodybuilding contests, and was on the way to becoming a professional fitness trainer.</p>`,
                    whyDidYouLeave: `<p>There was an anti-government demonstration in my town, and I took part in it, along with thousands of other young people who were unhappy about our country's political situation. The police intercepted us and fired gunshots at the crowd, and I was shot 3 times, in my arm, chest and hand. They arrested me and sentenced me to 3 years in prison for taking part in the protest. I no longer felt safe in my own country.</p>`,
                    howDidYouTravel: `
                    <p>I had friends living in Libya who heard what had happened and offered to help me cross the border from Egypt. In Libya I was put with a group of families I had never met before - 35 of us in total. We paid smugglers $2500 US Dollars each to let us onto a boat going to Italy. This is the minimum - a lot of people had to pay more. And if you couldn’t pay, they would just shoot you and throw you overboard. After 7 hours on the high seas, suddenly the boat stopped. The smugglers told us that the boat couldn’t go on because it was overloaded. I will never forget what happened next - they just threw 9 people into the Mediterranean sea - 6 men and even 3 women. The rest of us tried to intervene and stop them but they had machine guns and threatened to shoot us. So we were forced to watch innocent people, many of them our countrymen, being thrown into the middle of the ocean. They probably all died. Everyone that seemed weak or ill, they would just throw them overboard like trash.</p>
                    <p>Honestly, once the boat arrived in Italy, I had no idea where I was going. After some time I found another group of refugees and we threw together everything we had left to pay a man with a bus to take us to a safe place... anywhere safe. We drove for hours, and he dropped us off near a forest and told us, &quot;this is Germany... bye bye,&quot; and that was it.</p>
                    <p>I found my way to a town and after living on the streets for a little while I was found by German police and then taken to a refugee centre. A few days later I was transferred to Berlin, where I am now waiting for my asylum application to be processed.</p>
                    `,
                    whatDoYouWishFor: `
                    <p>I want to psychologically relax and be able to settle down and start my life again. I can't live in a country where we are constantly being harassed, beaten and killed by the police and government.</p>
                    <p>It would be great to be able to continue my training as a fitness instructor and work here in Germany.</p>
                    <p>The hardest thing right now is the confinement and the feeling that I am not yet free. We cannot do anything until our cases are processed here in Berlin, and mentally that is really tough.</p>
                    `
                }
            }
        ];
    }

    getRefugee(options) {
        if (!options)  {
            console.error('Cannot get refugee without search criteria');
        } else {
            if (options.id) {
                return this.refugees.find((refugee) => {
                    return refugee.id === options.id;
                });
            } else if (options.sex) {
                let refugeeSubset = this.refugees.filter((refugee) => {
                    return refugee.sex === options.sex;
                });
                if (refugeeSubset.length === 1) {
                    return refugeeSubset[0];
                } else if (refugeeSubset.length > 1) {
                    let randomIndex = Math.floor(Math.random() * (refugeeSubset.length + 1));
                    return refugeeSubset[randomIndex];
                }
            }
        }
    }
}

export default RefugeeService;
