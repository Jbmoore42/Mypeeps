import React, { useState, useEffect } from 'react';
import './DailyVerse.css';

// Update the verses array to include translations for all verses
const verses = [
  {
    reference: "John 3:16",
    translations: {
      english: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      spanish: "Porque de tal manera amó Dios al mundo, que dio a su Hijo unigénito, para que todo aquel que cree en él no se pierda, mas tenga vida eterna.",
      french: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
      german: "Denn also hat Gott die Welt geliebt, dass er seinen eingeborenen Sohn gab, damit alle, die an ihn glauben, nicht verloren werden, sondern das ewige Leben haben."
    }
  },
  {
    reference: "Philippians 4:13",
    translations: {
      english: "I can do all things through Christ who strengthens me.",
      spanish: "Todo lo puedo en Cristo que me fortalece.",
      french: "Je puis tout par celui qui me fortifie.",
      german: "Ich vermag alles durch den, der mich mächtig macht, Christus."
    }
  },
  {
    reference: "Psalm 23:1",
    translations: {
      english: "The Lord is my shepherd; I shall not want.",
      spanish: "El Señor es mi pastor; nada me faltará.",
      french: "L'Éternel est mon berger: je ne manquerai de rien.",
      german: "Der Herr ist mein Hirte; mir wird nichts mangeln."
    }
  },
  {
    reference: "Jeremiah 29:11",
    translations: {
      english: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
      spanish: "Porque yo sé los planes que tengo para vosotros, declara el Señor, planes de bienestar y no de calamidad, para daros un futuro y una esperanza.",
      french: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.",
      german: "Denn ich weiß wohl, was ich für Gedanken über euch habe, spricht der Herr: Gedanken des Friedens und nicht des Leides, dass ich euch gebe Zukunft und Hoffnung."
    }
  },
  {
    reference: "Proverbs 3:5-6",
    translations: {
      english: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      spanish: "Confía en el Señor con todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.",
      french: "Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse; reconnais-le dans toutes tes voies, et il aplanira tes sentiers.",
      german: "Vertraue auf den Herrn von ganzem Herzen und verlass dich nicht auf deinen Verstand; gedenke an ihn in allen deinen Wegen, so wird er dich recht führen."
    }
  }
];

// Language options
const languages = [
  { code: 'english', name: 'English', flag: '🇺🇸' },
  { code: 'spanish', name: 'Español', flag: '🇪🇸' },
  { code: 'french', name: 'Français', flag: '🇫🇷' },
  { code: 'german', name: 'Deutsch', flag: '🇩🇪' }
];

function DailyVerse() {
  const [dailyVerse, setDailyVerse] = useState<typeof verses[0] | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  useEffect(() => {
    // Get today's date as a string to use as a seed
    const today = new Date().toDateString();
    
    // Use the date string to generate a consistent random index for the day
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = seed % verses.length;
    
    setDailyVerse(verses[index]);
  }, []);

  if (!dailyVerse) return null;

  return (
    <div className="daily-verse">
      <div className="verse-header">
        <h2>Today's Verse for Discussion</h2>
        <div className="language-selector">
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`language-button ${selectedLanguage === lang.code ? 'active' : ''}`}
              onClick={() => setSelectedLanguage(lang.code)}
              title={lang.name}
            >
              {lang.flag}
            </button>
          ))}
        </div>
      </div>
      <div className="verse-content">
        <p className="verse-text">"{dailyVerse.translations?.[selectedLanguage]}"</p>
        <p className="verse-reference">— {dailyVerse.reference}</p>
      </div>
    </div>
  );
}

export default DailyVerse; 