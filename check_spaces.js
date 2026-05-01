require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function check() {
  const { data, error } = await supabase
    .from('articles')
    .select('content, title')
    .ilike('title', '%Ze života organizace%')
    .limit(1);

  if (error) {
    console.error(error);
    return;
  }
  
  if (data && data.length > 0) {
    const content = data[0].content;
    console.log("Title:", data[0].title);
    
    const nbspCount = (content.match(/&nbsp;/g) || []).length;
    const charNbspCount = (content.match(/\u00A0/g) || []).length;
    
    console.log("Počet &nbsp; :", nbspCount);
    console.log("Počet pevných mezer (\\u00A0):", charNbspCount);
    
    // Ukažme kousek textu kolem "máme"
    const index = content.indexOf('máme');
    if (index !== -1) {
        console.log("Okolí 'máme':", JSON.stringify(content.substring(index - 20, index + 20)));
    }
  } else {
    console.log("Článek nenalezen.");
  }
}

check();
