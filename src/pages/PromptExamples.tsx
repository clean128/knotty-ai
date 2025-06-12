import { useState } from "react";

const categoryPrompts = {
  "Hentai girls": [
    "1girl, large breasts, school uniform partially unbuttoned, shy smile, sitting on her bed, long yellow hair with red highlights, anime hentai art style",
    "1girl, large breasts, micro bikini, sunset beach, seductive pose, wet skin, pink twintails, glossy hentai illustration",
    "1girl, translucent wet shirt, no bra, bedroom background, underboob visible, short silver hair, dreamy expression, erotic anime painting",
    "1girl, flat chest, soaked tank top, laying on soft bed, arched back, green hair in pigtails, pencil hentai sketch style",
    "1girl, small breasts, blushing, panties visible under short skirt, kneeling pose, dark purple bob cut, seductive eyes, hentai style",
    "1girl, lingerie with lace trim, playful expression, sprawled on bed, wavy pink hair, warm candlelight lighting, detailed anime art",
    "1girl, cat ears, collar, oversized sweater slipping off shoulders, medium breasts, brown hair in ponytail, peace sign, lewd wink, high-quality anime drawing",
    "1girl, maid outfit, deep cleavage, bending over to clean, white thigh-highs, long black hair, sensual gaze, hentai drawing",
    "1girl, tight see-through shirt, nipples visible, close-up portrait, teal hair, confident smirk, soft-shaded hentai illustration",
  ],
  "Anime girls": [
    "1girl, bunny girl outfit with fishnet stockings, anime style, long black hair, club background with neon lights, playful smile",
    "1girl, schoolgirl uniform with blazer, classroom background, cheerful expression, short auburn bob haircut, anime style",
    "1girl, twintails, magical girl costume with glowing staff, surrounded by sparkles, excited face, vibrant anime render",
    "1girl, traditional kimono with cherry blossom pattern, serene outdoor garden, peaceful expression, long black hair, watercolor anime style",
    "1girl, idol outfit with ruffles and bow, stage lights and microphone, energetic pose, short pink hair, anime idol style",
    "1girl, oversized hoodie, headphones, sitting on couch, casual and relaxed, dark blue short hair, slice-of-life anime art",
    "1girl, witch hat, floating spellbook, magical glyphs glowing, purple hair in loose curls, dark fantasy anime style",
    "1girl, sci-fi bodysuit with glowing circuit lines, zero-gravity pose, space background, silver hair, futuristic anime art",
    "1girl, standing under falling sakura petals, school uniform, soft lighting, blush on cheeks, long brown hair, anime romance illustration",
  ],
  "Fantasy girls": [
    "1girl, elegant fantasy armor with glowing gems, elf ears, flowing blonde hair, magical aura surrounding her, ethereal landscape, high fantasy anime art",
    "1girl, purple sorceress robe, staff with glowing runes, silver hair and sharp eyes, ancient ruins background, mystical vibe, anime fantasy style",
    "1girl, warrior princess armor with battle scars, red braid, fierce eyes, standing on battlefield, fire and dust behind, anime fantasy artwork",
    "1girl, large angel wings, divine light from above, golden hair and halo, soft smile, clouds in the background, celestial anime painting",
    "1girl, green-skinned orc, battle-worn armor, determined stance, tusks, short black mohawk, misty mountains behind, gritty fantasy drawing",
    "1girl, dark mage in a hooded black cloak, shadowy aura, glowing red eyes, ancient scrolls floating around, anime dark fantasy",
    "1girl, forest spirit wrapped in vines, glowing eyes, earthy tones, long green hair, magical woodland background, mystical anime art",
    "1girl, centaur girl with a bow and quiver, galloping through open field, braided brown hair, medieval fantasy anime",
    "1girl, divine goddess with flowing white and gold robes, golden halo, radiant aura, long silver hair, temple background, sacred fantasy illustration",
  ],
  "Farm girls": [
    "1girl, 1horse, girl has tiny boobs and small nipples and has yellow hair with red highlights and she has on a hoodie and no pants or panties and she is under a horse on her knees holding a horse cock, erect horse cock, detailed veins and detailed horse cock skin, balls, big balls, the girl is blushing, detailed eyes, vampire teeth on the girl, the girl is smiling, horse cock worship",

    "drawing, sketch, pencil drawing, 1girl, 1dog, doggystyle, on her bed clenching the bedsheets, dog penis inside her vagina, cum dripping from vagina, 4k, dogsex, bestiality, she has yellow hair with red highlights, petite girl, small titties, 1girl, there is a werewolf penis laying across her face, cum, dog cock near her mouth, sucking the dog cock, dog cock worship, score_9, score_8, score_7, werewolf, werewolf is large, knotted werewolf cock, ((the girl has on a emo styled beanie hat and she is wearing a dog collar and she has tattoos on her arms and her chest and her thighs and she has a cute mini skirt on which is red and black plaid and she is also wearing a red and black plaid bra but has on a leather jacket which is open to expose her breasts and stomach and she also has on fighnets and garter straps and she is wearing cute combat boots and has on a thick brown belt",

    "1girl, 1werewolf, scary werewolf, werewolf is on top of a girl, her butt is up in the air slightly, his knotted werewolf cock is inside her vagina, there is cum everywhere under the girl dripping from her vagina, the werewolf has his hand on the girls head, the girl looks extremely scared or in alot of pain, the girl has on panties but they are pulled down to her knees and she is wearing a white top, she has realistic eyes, break, girl is upside down OR she is in missionary OR doggystyle position and her legs are opened for the werewolf cock to go into her vagina, vaginal sex",

    "1girl, 1dog, hentai girl, yellow hair with red highlights, dog, imminent bestiality:1.2, the girl is on her floor on her hands and knees under a dog, motion waves around girl and dog, hearts, the dog is humping the girls backside, dog penis inside vagina, sex with dog, BREAK, doggystyle sex with dog",

    "((a slightly curvy girl with blonde hair and thin thighs and a small styled butt, small ass, skinny, black shorts pulled down to her knees:1.2, panties pulled to the side:1.2, small perky boobs:1.3, skinny:1.2, cute beanie hat on her head which is emo styled:1.2, dog collar on her neck:1.2)), near a barn, outside, <lora:43stl1ght1ngXLP2:0.7> <lora:zy_AmateurStyle_v2:1>, ((dynamic lighting:1.2, low light:1.3, dim light:1.2)),  <lora:dogsex_bestiality:0.3>, panties, shorts, black shorts, pale white skin:1.3, pale skin, wet pussy, ((wet pussy, pussy juice, girl is looking at viewer:1.2)), ((view has the entire girl and horse showing)), ((polaroid photo:1.3, raw photo)), amazing absurdres:1.2, sex with horse, bestiality, beastiality, ((the view is from the side:1.3)), from side, side view, looking at the viewer, surprised, wide shot, studio quality image, ((the horse is on the girls backside)), (on a farm, outside, anal sex with horse), (side pussy), ((she is laying on her side and the horse penis is in the background and her pussy is leaking saliva and pussy juice as she smiles very evil at the viewer:1.3))",

    "1girl, 1horse, horse, girl, shiny skin, amazing details and contrast, beautiful high definition, horse cock is very long and thick, detailed horse cock, detailed horse cock skin, flared horse cock, veins on horse cock, break, the girl is on her hands and knees under a horse and his huge horse cock is going across her chest and she is smiling at the viewer, she is looking down at the horse cock, horse testicles visible, grass, outside near a farm, (she is wearing a hoodie and fingerless gloves and has on a dog collar and she has yellow hair with red highlights and freckles, blushing, hearts, horse cum on the ground)",

    "1girl, 1deathclaw, deathclaw, (woman is 20 years old), missionary sex with deathclaw, the deathclaw has a horse penis, girl is laying on her back on the ground with her knees up and bent and the deathclaw is fucking her in the pussy, the girl has short yellow hair that has red highlights and she has cute vampire teeth, petite girl:1.2, small boobs:1.3, cute outfit, ((the girl does not have horns on her head:1.4)), ((clean edges, vivid colors)), ((stomach bulge:1.3)), bulged stomach",

    "score_9, score_8, score_7, uncensored, intricate details, rating_explicit, chromatic aberration, highly detailed skin, real life skin features, realistic, detailed face, detailed feet, tilt head, score_9,score_8_up, ziprealism, (masterpiece:1.5, best quality, absurd res, ultra detailed:1.5), realistic, 1girl, anal, ass, big horse dildo in pussy:1.3, dildo is a horse penis dildo:1, deep penetration, hetero, closed mouth, uncensored, (vaginal:1.2), naughty face, bdsm gear, bdsm outfit, bondage, bondage gear, bondage outfit,  torn clothes, thigh high socks, torn socks, in her bedroom which is greatly detailed, amazing pose, great pose of her legs, the girl is in her living room on the carpet:1, ((girl has small breasts:1.4)), photo-realistic:1.3, realistic, realism, raw photo, fujifilm,  amateur photo, pose is amazing, ((she is wearing leggings and her leggings and panties are pulled down to her knees and cum is dripping out of her vagina onto the ground:1.3)), ((big horse cock dildo:1.3))",

    "1girl, A petite woman is under a horse on her knees, holding horse cock, the horse cock is seen behind her but erect past her shoulders towards the viewer, she is wearing a cute hoodie and no pants or panties, white shoes, bent down, horse cock worship, freckles, blush, cum, lots of cum, massive horse cock, break, the horse cock is going across the girls shoulder and chest area, ((vivid colors and clean edges:1.2, good use of the color black:1.2)), ((close up of the horse cock across her chest))",

    "score_9, score_8_up, score_7_up, uncensored, intricate details, rating_explicit, her throat is bulged outward, chromatic aberration, realistic, detailed face, detailed feet, tilt head, score_9,score_8_up,score_7_up,score_6_up, ziprealism, (masterpiece:1.2, best quality, absurd res, ultra detailed), realistic, (a girl with small boobs and yellow hair with red highlights and who is petite is sucking on a horse penis), bestiality, cum, (oral, felato, deepthroat, deep throat:1.2), horse, (horse penis), (size difference:1.4), horse getting his penis sucked by a girl, cum, cum in mouth, cum on chest, cum dripping out of mouth, ((outside on a farm in a cinematic area:1.3)), (bestiality), (horse, horse penis:1.1), under a horse, on knees, (size difference:1.4), oral, (deepthroat), small breast, gorgeous, horse:1.2, horse penis inside mouth:1, saliva and drool dripping from horse penis:1.4, ((lifelike artist, lifelike, amazing artist, high quality artist, lifelike)), BREAK, ((THROAT BULGE:1.3))",

    "score_9, score_8, masterpiece, amazing resolution, great detail of the girl and the horse cock that's in her mouth, horse cock coming from the left or right side of the screen and is erect and inside the girls mouth, sucking on horse cock, detailed horse cock, amazing quality, girl is wearing a really cute outfit but only her head and shoulders are really seen, close up, sucking horse cock, (she is inside of a concrete room and there is dirt all over her body which is dried up and she also has dried cum on her shirt which has stained it heavily with flakey white dry cum), ((she has yellow hair with red highlights:1.3))",

    "horse cock gloryhole, a horse penis sticking through a glorhole, hole in the wall, large horse cock, 1girl, sucking horse cock, on her knees, braided gray hair, absurdres, intense resolution, SMALL boobies, Celtic uniform, celtic armor on girl, fire in background, smoke from a building that is on fire behind the girl",

    "score_9, score_8, score_7, uncensored, intricate details, rating_explicit, chromatic aberration, highly detailed skin, real life skin features, realistic, detailed face, detailed feet, tilt head, score_9,score_8_up, ziprealism, (masterpiece:1.5, best quality, absurd res, ultra detailed:1.5), realistic, 1girl, anal, ass, tentacle monster:1, tentacle inside vagina:1, tentacles around girls body:1, ((tentacle sex:1)), sex with tentacle monster:1, big monster:1, ((very detailed tentacles and monster:1)), amazing photo:1, masterpiece:1",

    "1girl, 1horse, horse, a girl is in a barn filled with hay and straw bent over in doggystyle position as a horse fucks her from behind:1.2, doggystyle sex with horse, high fidelity, raw photo, horse sex, bestiality",

    "1girl, tentacles, on a beach partially in the water, tide coming in, tentacles wrapped all around her legs and her chest, ((tentacles are hyper-realistic and extremely detailed on their skin and suction cups and have what appears to be barnacles on them:1.3)), barnacles, tentacle sex, sex with tentacles, tentacle inside her vagina, looking back at viewer:1.2, cute girl with small perky boobs who has a dog collar on her neck and has yellow hair with red highlights, vivid color, deep black colors, very realistic scene, ((she is not standing up but laying down on the sand)), tentacles do not look bland at all",

    "((a slightly curvy girl with blonde hair and thin thighs and a small styled butt, small ass, skinny, black shorts pulled down to her knees:1.2, doggystyle sex with horse, horse cock inside vagina, ((horse cock is massive and much thicker than normal)), her pussy is tinted red like its been hurt, panties pulled to the side:1.2, small perky boobs:1.3, skinny:1.2, dog collar on her neck:1.2)), near a barn, outside, panties, shorts, black shorts, pale white skin:1.3, pale skin, wet pussy, sex with horse, bent over fucked by a horse",

    "1girl, 1dog, sketch, high quality sketch, vector illustration, girl is on her bed on her hands and knees, doggystyle, doggystyle sex with dog, imminent bestiality, dog on top of girls backside, clenching her bedsheets, blush, xray, x-ray, doggystyle sex with dog, dogsex, cum dripping from vagina, hearts, motion",

    "1girl, horse cock gloryhole, a horse penis sticking through a glorhole, hole in the wall, large horse cock, 1girl, sucking horse cock, on her knees, braided gray hair, absurdres, intense resolution, SMALL boobies, Celtic uniform, celtic armor on girl, fire in background, smoke from a building that is on fire behind the girl",

    "A cute hentai girl who resembles a 18 year old with short yellow hair with red highlights, werewolf behind her, werewolf penis inside vagina, panties, werewolf is quite large, big knotted werewolf cock, doggystyle sex with werewolf, ((yellow short hair with red highlights, smile, smiling, teeth, cute vampire styled teeth)), yellow hair with red highlights, wearing a cute red and black plaid miniskirt and arm sleeves and a dog collar and cute detailed feet",
  ],
};

const PromptExamples = () => {
  const [activeTab, setActiveTab] = useState("Anime girls");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">
          🧪 Prompt Examples
        </h1>
        <p className="text-gray-400">
          Click on any prompt to copy it to your clipboard
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(categoryPrompts).map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              activeTab === category
                ? "bg-primary-600 text-black"
                : "bg-dark-700 text-gray-300 hover:bg-dark-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categoryPrompts[activeTab as keyof typeof categoryPrompts].map(
            (prompt, index) => (
              <div
                key={index}
                onClick={() => copyToClipboard(prompt)}
                className="bg-dark-700 rounded-lg p-4 cursor-pointer hover:bg-dark-600 transition-colors duration-200 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-primary-600">
                    {activeTab} #{index + 1}
                  </h3>
                  <span className="text-xs text-gray-500 group-hover:text-gray-400">
                    Click to copy
                  </span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed line-clamp-6">
                  {prompt}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      <div className="section bg-blue-900/20 border-blue-700">
        <div className="flex items-start space-x-3">
          <div className="text-blue-400 text-xl">💡</div>
          <div>
            <h3 className="font-medium text-blue-300 mb-1">Pro Tip</h3>
            <p className="text-blue-200 text-sm">
              These prompts are starting points. Feel free to modify them,
              combine elements from different prompts, or add your own creative
              touches to get the exact result you're looking for.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptExamples;
