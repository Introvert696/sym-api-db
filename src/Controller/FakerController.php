<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class FakerController
{
    private $contentVars = "Привет, пока, как, ты, что, где, когда, почему, хорошо, пожалуйста, спасибо, извини, боюсь, помоги, поздравляю, здорово, отлично, проблема, всё, давай, конечно, может, сильно, любовь, могу, нужен, вижу, тысяча, время, понял, час, день, ночь, место, так, легко, точно, какой, где-то, тогда, это, друзья, семья, отправить, ребёнок, вопрос, ответ, интересно, сейчас, позже, праздник, соскучился, всё-таки, объясни, ура, заметил, вместе, мы, месяц, секунда, важно, обещаю, задание, ошибка, больше, меньше, ожидаю, хотел, сразу, вопросы, согласен, выход, печально, рад, долго, приятно, скучаю, невозможно, надо, грустно, весело, благодарю, план, ребята, работать, учёба, внимание, идём, правда, встреча, подарок, завтра, ночь, день, любовь, встречу, ушёл, хочу, могу, быстро, вчера, сегодня, готов, не могу, сильно, ожидание, день, слово, история, внимание, проблема, вряд ли, счастье, ошибка, внимание, ответить, не знаю";
    private $usernamesArr = "DarkKnight, ShadowHunter, SilentWolf, StormBringer, NightWraith, MysticPhoenix, IronTitan, FrozenBlade, ThunderStrike, RedViper, PhantomAce, SteelDragon, WolfLord, BlazeFury, DeathRider, CyberStryker, GhostReaper, BlackMamba, ChaosVortex, SavageBeast, DragonSlayer, ArcaneWizard, ShadowScythe, DoomBringer, EternalFlame, IceFang, StormWarden, VenomClaw, WildRaven, FierceBlade, BlazeKnight, FrostBite, IronClaw, SolarSpear, NightShifter, SoulReaver, PhantomFury, StarHunter, BloodReaper, ThunderClash, DarkPhoenix, SteelViper, WindWhisperer, ThunderWolf, BlackInferno, CrimsonRogue, DeathBringer, SilentBlaze, LunarShade, DarkSpectre, FireDragon, DarkPhantom, MysticShade, StarBlaze, VengefulSoul, IronHeart, SilentWraith, GhostHunter, EmberKnight, StormWitch, DreadShadow, ToxicClaw, PhantomKnight, VortexLord, RavenousWolf, StormChaser, DeathWhisperer, SilentRevenge, VenomousFury, DarkSorcerer, IronPhoenix, ShadowWarden, BloodKnight, SpectralDragon, RedGhost, SolarKnight, FiercePhantom, MoonSlayer, SavageWitch, CrimsonShroud, FrozenDragon, NightReaper, WildKnight, LightningViper, ShadowHunterX, SilverFang, ChaosSlayer, StormReaver, IceGhost, NightBlade, VengefulDragon, PhantomFang, LightningHunter, StormShifter, NightTalon, DarkWhisper, VoidSlayer, IronShade, LunarBlade, FrostHunter.";
    private int $wordCount = 10;
    private int $threadCount = 2;
    private int $postsCount = 2;
    private array $threadArr = [];
    private array $postsArr = [];
    public function __construct()
    {
        $this->contentVars = explode(',', $this->contentVars);
        $this->usernamesArr = explode(',', $this->usernamesArr);
    }
    public function generateData(): array
    {
        $data['username'] = '';
        $data['content'] = '';
        //create username
        $data['username'] = $this->usernamesArr[rand(0, count($this->usernamesArr) - 1)];
        //for loop to create sentence 
        for ($i = 0; $i < $this->wordCount; $i++) {
            $data['content'] .= $this->contentVars[rand(0, count($this->contentVars) - 1)] . " ";
        }
        return $data;
    }
    public function createThread(): static
    {
        $thread_arr = [];

        //create for loop, and create a row
        for ($i = 0; $i < $this->threadCount; $i++) {
            //create a row
            $raw_data = $this->generateData();
            array_push($thread_arr, $raw_data);
        }
        $this->threadArr = $thread_arr;
        return $this;
    }
    public function createPosts(DBController $dbcontroller): static
    {
        $posts = [];
        // get all threads
        $threads = $dbcontroller->all('thread')->query();
        // foreach threads
        foreach ($threads as $thread) {
            // dd($thread);
            // generate posts according to count variables to specific thread 
            // create error +- 3 count posts
            // add ['thread_id'], it a current thread, to whom create a posts
            for ($i = 0; $i < $this->postsCount; $i++) {
                $data = $this->generateData();
                $data['thread_id'] = $thread['id'];
                // dd($data);
                array_push($posts, $data);
            }

        }
        $this->postsArr = $posts;
        return $this;

    }
    public function seed(DBController $dbcontroller): bool
    {

        // seed all threads
        // sedd posts
        if (!empty($this->threadArr)) {
            // seeding threads
            foreach ($this->threadArr as $thread) {
                $dbcontroller->store('thread', $thread);
            }


        }
        if (!empty($this->postsArr)) {
            //seeding posts
            foreach ($this->postsArr as $post) {
                // dd($post);
                $dbcontroller->store('posts', $post);
            }
        }

        return true;
    }
}
