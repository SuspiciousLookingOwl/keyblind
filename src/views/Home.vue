<template>
  <div class="text-light">
    <div class="container">
      <!-- Latest Test -->
      <div class="row m-0 py-4 border-bottom">
        <div class="col-sm-12 display-7 mb-3 px-0">
          Last Test
        </div>
        <div class="col-md-4 py-2 px-0">
          WPM:
          <div class="display-5">{{ wpm }} <small class="display-8">wpm</small></div>
        </div>
        <div class="col-md-4 py-2 px-0">
          Error:
          <div class="display-5">{{ errors }} <small class="display-8">words</small></div>
        </div>
      </div>
      <!-- End Latest Test -->
    </div>

    <div class="py-4">
      <!-- Options -->
      <div class="container">
        <div class="display-8 text-secondary clickable" v-on:click="showOption = !showOption">
          Option
          <span
            class="ml-2 fas display-9"
            :class="showOption ? 'fas fa-chevron-down' : 'fa-chevron-right'"
          />
        </div>

        <div v-if="showOption" class="row">
          <div class="col-md-6">
            <k-select-option
              label="Language"
              class="input-short"
              v-model="testOptions.language"
              :options="languages"
            />
            <k-select-option
              label="Complexity"
              class="input-short"
              v-model="testOptions.difficulty"
              :options="complexityOptions"
            />
            <k-slider
              label="Test Length"
              min="10"
              max="100"
              class="input-short"
              v-model="testOptions.length"
            />
          </div>

          <div class="col-md-6">
            <k-slider
              label="Punctuation Probability"
              min="0"
              max="100"
              class="input-short"
              v-model="testOptions.punctuationProbability"
              :preview="value => `${value}%`"
            />
            <k-slider
              label="Capital Letter Probability"
              min="0"
              max="100"
              class="input-short"
              v-model="testOptions.capitalLetterProbability"
              :preview="value => `${value}%`"
            />
          </div>
        </div>
        <!-- End Options -->

        <div class="display-8 py-4">
          Type these words:
          <div class="float-right">
            <span
              v-bind:class="[isFullWidth ? 'fa-compress-arrows-alt' : 'fa-expand-arrows-alt']"
              class="fas fa-lg clickable text-secondary"
              v-on:click="isFullWidth = !isFullWidth"
            ></span>
          </div>
        </div>
      </div>

      <div class="pb-4" v-bind:class="[isFullWidth ? 'container-fluid px-2 px-md-5' : 'container']">
        <div class="word-display display-6 py-4">
          <template v-for="(word, i) in words">
            <span
              :key="`word-${i}`"
              v-bind:class="
                typedWords.length == i
                  ? 'bg-secondary'
                  : i + 1 > typedWords.length
                  ? ''
                  : word == typedWords[i]
                  ? 'text-space'
                  : 'bg-danger'
              "
              >{{ word }}</span
            >
            <template v-if="i < words.length - 1">
              <span class="text-space px-1" :key="`space-${i}`">&#8203;_&#8203;</span>
            </template>
          </template>
        </div>

        <div class="py-4">
          <input
            type="text"
            autofocus
            v-model="typedWord"
            @keyup="eachKey"
            @keydown="
              $e => {
                if ($e.code === 'F5') {
                  $e.preventDefault();
                  startNewRound();
                }
              }
            "
            @keydown.space="addTypedWords"
            @keydown.esc="resetRound"
            placeholder="Type here..."
            class="form-control form-dark display-6"
          />
          <div class="display-9 py-3 text-secondary">
            Tip: You can press ESC on your keyboard to restart current test, or press F5 to generate
            new one.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

import KSlider from "@/components/KSlider.vue";
import KSelectOption from "@/components/KSelectOption.vue";
import KTextField from "@/components/KTextField.vue";
import { generatePhoneticWords, generateWords } from "@/common/helper";

interface TestOptions {
  difficulty: number;
  length: number;
  capitalLetterProbability: number;
  punctuationProbability: number;
  language: string;
}

@Component({
  components: { KSlider, KSelectOption, KTextField }
})
export default class Home extends Vue {
  testOptions: TestOptions = {
    difficulty: 1,
    length: 20,
    capitalLetterProbability: 0,
    punctuationProbability: 0,
    language: "phonetic"
  };

  languages = [
    "phonetic",
    "english",
    { label: "──────────" },
    "afrikaans",
    "albanian",
    "arabic",
    "armenian",
    "azerbaijani",
    "basque",
    "belarusian",
    "bengali",
    "bosnian",
    "bulgarian",
    "catalan",
    "cebuano",
    "chichewa",
    "chinese",
    "corsican",
    "croatian",
    "czech",
    "danish",
    "dutch",
    "esperanto",
    "estonian",
    "filipino",
    "finnish",
    "french",
    "frisian",
    "galician",
    "georgian",
    "german",
    "greek",
    "gujarati",
    "haitian",
    "hausa",
    "hawaiian",
    "hebrew",
    "hindi",
    "hmong",
    "hungarian",
    "icelandic",
    "igbo",
    "indonesian",
    "irish",
    "italian",
    "japanese",
    "javanese",
    "kannada",
    "kazakh",
    "khmer",
    "korean",
    "kurdish",
    "kyrgyz",
    "lao",
    "latin",
    "latvian",
    "lithuanian",
    "luxembourgish",
    "macedonian",
    "malagasy",
    "malayalam",
    "malaysian",
    "maltese",
    "maori",
    "marathi",
    "mongolian",
    "myanmar",
    "nepali",
    "norwegian",
    "pashto",
    "persian",
    "polish",
    "portuguese",
    "punjabi",
    "romanian",
    "russian",
    "serbian",
    "sesotho",
    "shona",
    "sindhi",
    "sinhala",
    "slovak",
    "slovenian",
    "somali",
    "spanish",
    "sundanese",
    "swahili",
    "swedish",
    "tajik",
    "tamil",
    "telugu",
    "thai",
    "turkish",
    "ukrainian",
    "urdu",
    "uzbek",
    "vietnamese",
    "welsh",
    "xhosa",
    "yiddish"
  ];

  name = localStorage.name || "";
  wpm = localStorage.wpm || 0;
  errors = localStorage.errors || 0;

  startTime = 0;
  words: string[] = [];
  typedWord = "";
  typedWords: string[] = [];

  showOption = false;
  isFullWidth = false;

  get complexityOptions() {
    return [
      {
        label: this.testOptions.language === "phonetic" ? "Low" : "200 Most Common Words",
        value: 1
      },
      {
        label: this.testOptions.language === "phonetic" ? "Medium" : "800 Most Common Words",
        value: 2
      },
      {
        label: this.testOptions.language === "phonetic" ? "High" : "1000 Most Common Words",
        value: 3
      }
    ];
  }

  @Watch("testOptions", { deep: true })
  onTestOptionsChange() {
    this.startNewRound();
  }

  created() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let storedOptions: Partial<TestOptions> = {};
    try {
      storedOptions = JSON.parse(localStorage.testOptions);
    } catch (err) {
      /* Not found */
    }
    this.testOptions = {
      difficulty: storedOptions?.difficulty ?? 1,
      length: storedOptions?.length ?? 20,
      capitalLetterProbability: storedOptions?.capitalLetterProbability ?? 0,
      punctuationProbability: storedOptions?.punctuationProbability ?? 0,
      language: storedOptions?.language ?? "phonetic"
    };
  }

  /**
   * Start new round
   */
  startNewRound() {
    this.typedWord = "";
    this.words = [];
    this.startTime = 0;
    this.typedWords = [];
    this.words =
      this.testOptions.language === "phonetic"
        ? generatePhoneticWords(this.testOptions)
        : generateWords(this.testOptions);

    localStorage.testOptions = JSON.stringify(this.testOptions);
  }

  /**
   * Reset current round
   */
  resetRound() {
    this.typedWord = "";
    this.startTime = 0;
    this.typedWords = [];
  }

  /**
   * Called each time a key is pressed on the text field
   */
  eachKey() {
    // Start timer
    if (this.startTime == 0) this.startTime = performance.now();

    // If typed word is empty, restart the timer
    if (this.typedWords.length === 0 && !this.typedWord.trim()) {
      this.startTime = 0;
    }

    // Add last word if it's correctly typed
    // Auto finish round if last word is correctly typed
    if (
      this.typedWords.length == this.testOptions.length - 1 &&
      this.typedWord.trim() == this.words[this.testOptions.length - 1]
    ) {
      this.addTypedWords();
    }
  }

  /**
   * Store typed words when user pressed space
   */
  addTypedWords() {
    if (!this.typedWord.trim()) return;
    this.typedWords.push(this.typedWord.trim());
    this.typedWord = "";
    if (this.typedWords.length == this.words.length) {
      this.finishRound();
    }
  }

  /**
   *
   */
  finishRound() {
    const duration = performance.now() - this.startTime;
    const errorCount = this.words.filter((word, i) => word !== this.typedWords[i]).length;

    this.errors = errorCount;
    this.wpm = parseFloat(
      ((60 / (duration / 1000)) * (this.testOptions.length - errorCount)).toFixed(2)
    );

    this.startNewRound();
  }
}
</script>

<style scoped>
.input-short {
  max-width: 225px;
}
</style>
