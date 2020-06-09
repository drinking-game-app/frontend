/*
 * File: question-input.component.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Friday, 5th June 2020 11:13:02 am
 * Author: Ross MacDonald
 * ---------------
 * File Description: Component filling out questions in game
 * Last Modified: Friday, 5th June 2020 11:13:07 am
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import { Layout, Button, IconProps, Icon, Text } from '@ui-kitten/components';
import React from 'react';
import { Formik, FormikProps } from 'formik';
import { QuestionSchema, QuestionInputData } from '../data/question-input.model';
import { FormInput } from './form-input.component';
import { IInitialState, IPlayer } from '../reducers/interfaces';
import { gameActions } from '../actions';
import { connect } from 'react-redux';
import { ButtonInput } from './form-button.component';
import { View, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Question, RoundOptions } from '@rossmacd/gamesock-client';

/**
 * Importing styles
 * @param theme path
 * @param Form Module name
 */
const styles = require('../themes')('Form');

/**
 * Interface actions
 * for the component
 */
interface IActions {
  setGameLoading: () => void;
  inputQuestion: ({ question }: Question) => void;
}

/**
 * Interface Props
 * for the component
 */
interface IProps {
  isLoading: boolean;
  questionInput: string;
  questions: Question[];
  user: IPlayer;
  roundOptions: RoundOptions;
}

const QuesionInput = (props: IProps & IActions) => {
  const submit = (values: { questionInput: string }) => {
    console.log('submitting!!!');
    props.setGameLoading();

    const question: Question = {
      playerId: props.user.id,
      question: values.questionInput,
    };

    props.inputQuestion(question);
  };

  const renderShuffleIcon = (props: IconProps): React.ReactElement => <Icon {...props} name="shuffle-2-outline" />;

  const shuffleQuestion = () => {
    const objects = [
      'Christmas ornament',
      'bag of popcorn',
      'bag of rubber bands',
      'balloon',
      'banana',
      'bangle bracelet',
      'bar of soap',
      'beaded necklace',
      'bed',
      'bell',
      'blowdryer',
      'book of jokes',
      'book of matches',
      'bottle',
      'bottle cap',
      'bottle of glue',
      'bottle of honey',
      'bottle of nail polish',
      'bottle of oil',
      'bottle of paint',
      'bottle of pills',
      'bottle of soda',
      'bottle of sunscreen',
      'bottle of water',
      'bouquet of flowers',
      'bowl',
      'box',
      'box of baking soda',
      'box of chalk',
      'box of crayons',
      'box of tissues',
      'bread',
      'broccoli',
      'brush',
      'butter knife',
      'camera',
      'can of beans',
      'can of chili',
      'can of peas',
      'can of whipped cream',
      'candle',
      'candlestick',
      'car',
      'cars',
      'carton of ice cream',
      'cat',
      'chain',
      'chicken',
      "children's book",
      'chocolate',
      'year tutor hat',
      'clock',
      'coffee pot',
      'computer',
      'container of pudding',
      'cookie jar',
      'cookie tin',
      'cow',
      'cowboy hat',
      'craft book',
      'credit card',
      'crow',
      'crowbar',
      'dagger',
      'dictionary',
      'dog',
      'domino set',
      'door',
      'drawer',
      'drill press',
      'feather',
      'few batteries',
      'fish',
      'fishing hook',
      'flag',
      'flashlight',
      'flyswatter',
      'football',
      'fork',
      'fridge',
      'frying pan',
      'garden spade',
      'giraffe',
      'glass',
      'glow stick',
      'grocery list',
      'hair brush',
      'hair clip',
      'hammer',
      'hamster',
      'hand bag',
      'handful of change',
      'hanger',
      'harmonica',
      'helmet',
      'house',
      'ipod',
      'ipod charger',
      'jar of jam',
      'jar of peanut butter',
      'jar of pickles',
      'jigsaw puzzle',
      'key',
      'keyboard',
      'keychain',
      'kitchen knife',
      'knife',
      'lamp shade',
      'laser pointer',
      'lemon',
      'letter opener',
      'light bulb',
      'lighter',
      'lime',
      'lion',
      'magazine',
      'magnet',
      'marble',
      'martini glass',
      'microphone',
      'milk',
      'mirror',
      'mobile phone',
      'model car',
      'money',
      'mop',
      'mouse pad',
      'nail clippers',
      'necktie',
      'needle',
      'notebook',
      'notepad',
      'novel',
      'pack of cards',
      'package of crisp and crunchy edibles',
      'bag of spuddys',
      'packet of seeds',
      'paintbrush',
      'pair of binoculars',
      'pair of dice',
      'pair of earrings',
      'pair of glasses',
      'pair of handcuffs',
      'pair of knitting needles',
      'pair of rubber gloves',
      'pair of safety goggles',
      'pair of scissors',
      'pair of socks',
      'pair of sunglasses',
      'pair of water goggles',
      'panda',
      'pants',
      'paper',
      'pasta strainer',
      'pearl necklace',
      'pen',
      'pencil holder',
      'pepper shaker',
      'perfume',
      'phone',
      'photo album',
      'picture frame',
      'piece of gum',
      'pillow',
      'pinecone',
      'plastic fork',
      'plush octopus',
      'pocketknife',
      'pocketwatch',
      'pool stick',
      'postage stamp',
      'purse',
      'purse/bag',
      'quartz crystal',
      'rabbit',
      'radio',
      'rat',
      'remote',
      'rhino',
      'rock',
      'roll of duct tape',
      'roll of masking tape',
      'roll of stickers',
      'roll of toilet paper',
      'rolling pin',
      'rope',
      'rubber band',
      'rubber duck',
      'rusty nail',
      'safety pin',
      'sailboat',
      'salt shaker',
      'sandal',
      'sandglass',
      'scarf',
      'scotch tape',
      'screw',
      'screwdriver',
      'seat belt',
      'shark',
      'sharpie',
      'sheep',
      'sheet of paper',
      'shirt',
      'shirt button',
      'shoe lace',
      'shoes',
      'shopping bag',
      'shovel',
      'sidewalk',
      'sketch pad',
      'slipper',
      'snail shell',
      'snowglobe',
      'soccer ball',
      'socks',
      'spatula',
      'spice bottle',
      'sponge',
      'spoon',
      'squirrel',
      'squirt gun',
      'steak knife',
      'stick of incense',
      'sticker book',
      'sticky note',
      'stockings',
      'stop sign',
      'straw',
      'sun glasses',
      'sword',
      'tea cup',
      'tea pot',
      'television',
      'tennis ball',
      'tennis racket',
      'thermometer',
      'thimble',
      'thread',
      'tiger',
      'tire swing',
      'tissue box',
      'toe ring',
      'toilet',
      'toilet paper tube',
      'tomato',
      'tooth pick',
      'toothbrush',
      'toothpaste',
      'toothpick',
      'towel',
      'toy car',
      'toy plane',
      'toy soldier',
      'toy top',
      'trash bag',
      'tree',
      'trucks',
      'tube of lip balm',
      'tube of lipstick',
      'turtle',
      'tv',
      'vase',
      'wallet',
      'washcloth',
      'washing machine',
      'watch',
      'water bottle',
      'wedding ring',
      'whale',
      'whistle',
      'window',
      'wine glass',
      'wireless control',
      'wooden spoon',
      'word search',
      'wrench',
      'wristwatch',
      'zebra',
      'zipper',
    ];

    const verbs = [
      'accept',
      'add',
      'admire',
      'admit',
      'advise',
      'afford',
      'agree',
      'alert',
      'allow',
      'ask',
      'attach',
      'attack',
      'attempt',
      'attend',
      'attract',
      'avoid',
      'back',
      'bake',
      'balance',
      'ban',
      'bang',
      'bare',
      'bat',
      'bathe',
      'battle',
      'beam',
      'beg',
      'behave',
      'belong',
      'bleach',
      'bless',
      'blind',
      'blink',
      'blot',
      'blush',
      'boast',
      'boil',
      'bolt',
      'bomb',
      'book',
      'bore',
      'change',
      'charge',
      'chase',
      'cheat',
      'check',
      'cheer',
      'chew',
      'choke',
      'chop',
      'claim',
      'clap',
      'clean',
      'coil',
      'collect',
      'colour',
      'comb',
      'command',
      'communicate',
      'compare',
      'compete',
      'complain',
      'complete',
      'concentrate',
      'concern',
      'confess',
      'confuse',
      'connect',
      'decay',
      'deceive',
      'decide',
      'decorate',
      'delay',
      'delight',
      'deliver',
      'depend',
      'describe',
      'desert',
      'dust',
      'fear',
      'fence',
      'fetch',
      'file',
      'fill',
      'film',
      'fire',
      'fit',
      'fix',
      'flap',
      'flash',
      'float',
      'flood',
      'flow',
      'flower',
      'fold',
      'follow',
      'fool',
      'glue',
      'grab',
      'grate',
      'grease',
      'harass',
      'harm',
      'hate',
      'haunt',
      'head',
      'heal',
      'heap',
      'heat',
      'help',
      'hook',
      'hop',
      'hope',
      'hover',
      'hug',
      'hum',
      'hunt',
      'hurry',
      'identify',
      'ignore',
      'imagine',
      'impress',
      'improve',
      'include',
      'increase',
      'interest',
      'interfere',
      'interrupt',
      'introduce',
      'invent',
      'invite',
      'irritate',
      'learn',
      'level',
      'license',
      'lick',
      'lie',
      'lighten',
      'like',
      'list',
      'manage',
      'march',
      'mark',
      'marry',
      'match',
      'mate',
      'matter',
      'measure',
      'meddle',
      'melt',
      'memorise',
      'mend',
      'mess up',
      'milk',
      'mine',
      'miss',
      'mix',
      'mug',
      'multiply',
      'murder',
      'nail',
      'name',
      'need',
      'nest',
      'nod',
      'note',
      'notice',
      'number',
      'obey',
      'object',
      'peck',
      'pedal',
      'peel',
      'peep',
      'perform',
      'permit',
      'phone',
      'pick',
      'pinch',
      'pine',
      'place',
      'plan',
      'plant',
      'play',
      'please',
      'pour',
      'practise',
      'pray',
      'preach',
      'precede',
      'prefer',
      'prepare',
      'present',
      'preserve',
      'press',
      'pretend',
      'prevent',
      'prick',
      'print',
      'produce',
      'program',
      'promise',
      'protect',
      'provide',
      'pull',
      'pump',
      'punch',
      'race',
      'radiate',
      'rain',
      'release',
      'rely',
      'remain',
      'remember',
      'remind',
      'remove',
      'repair',
      'repeat',
      'replace',
      'reply',
      'report',
      'reproduce',
      'request',
      'rescue',
      'retire',
      'return',
      'rhyme',
      'rinse',
      'risk',
      'rob',
      'rock',
      'roll',
      'rot',
      'rub',
      'satisfy',
      'save',
      'saw',
      'scare',
      'scatter',
      'scold',
      'scorch',
      'scrape',
      'scratch',
      'scream',
      'screw',
      'scribble',
      'scrub',
      'seal',
      'smell',
      'smile',
      'smoke',
      'snatch',
      'sneeze',
      'sniff',
      'snore',
      'snow',
      'soak',
      'soothe',
      'sound',
      'spare',
      'spark',
      'sparkle',
      'spell',
      'spill',
      'spoil',
      'spot',
      'spray',
      'sprout',
      'squash',
      'squeak',
      'squeal',
      'squeeze',
      'stain',
      'stamp',
      'stare',
      'start',
      'support',
      'suppose',
      'surprise',
      'surround',
      'suspect',
      'suspend',
      'switch',
      'talk',
      'tame',
      'tap',
      'taste',
      'tease',
      'transport',
      'trap',
      'travel',
      'treat',
      'tremble',
      'trick',
      'trip',
      'trot',
      'trouble',
      'trust',
      'try',
      'tug',
      'whistle',
      'wink',
      'wipe',
      'wish',
      'wobble',
      'wonder',
      'work',
      'worry',
      'wrap',
      'wreck',
      'wrestle',
      'wriggle',
      'x-ray',
      'zoom',
    ];

    const randFromAr = (array:any[])=>array[Math.floor(Math.random() * array.length)];
    const randomQuestion = () =>{
        return `Who's more likely to ${randFromAr(verbs)} a ${randFromAr(objects)}?`
    }

    console.log(randomQuestion());
  };

  const { isLoading, questionInput } = props;

  const renderForm = (props: FormikProps<QuestionInputData>): React.ReactFragment => {
    const loading = isLoading || props.isSubmitting;

    if (isLoading === false && props.isSubmitting === true) props.setSubmitting(false);
    return (
      <View style={styles.questionInputContainer}>
        {/* // <KeyboardAwareScrollView
            //     style={{ backgroundColor: '#4c69a5' }}
            //     resetScrollToCoords={{ x: 0, y: 0 }}
            //     contentContainerStyle={styles.questionInputContainer}
            //     // scrollEnabled={false}
            // > */}
        {/* // <KeyboardAvoidingView behavior='padding' style={styles.questionInputContainer}> */}

        <Button accessoryLeft={renderShuffleIcon} onPress={() => shuffleQuestion} status="danger" disabled={loading} style={styles.questionInputButton} />
        <FormInput id="questionInput" style={[styles.questionInput]} size="large" placeholder="Insert your question" value={props.values.questionInput} />
        <ButtonInput icon="checkmark-outline" disabled={loading} loading={loading} text="" onPress={() => props.handleSubmit()} status="success" style={styles.questionInputButton} />

        {/* // </KeyboardAvoidingView> */}
        {/* </KeyboardAwareScrollView> */}
      </View>
    );
  };

  if (props.roundOptions.numQuestions <= props.questions.length)
    return (
      <Layout>
        <Text>Questions submitted! Waiting for other players...</Text>
      </Layout>
    );
  return (
    <Layout>
      <Text>
        Input your questions {props.questions.length} / {props.roundOptions.numQuestions}
      </Text>
      <Formik
        initialValues={{ questionInput: questionInput }}
        validationSchema={QuestionSchema}
        onSubmit={(values, actions) => {
          submit(values);
          actions.setValues({ questionInput: questionInput });
        }}>
        {renderForm}
      </Formik>
    </Layout>
  );
};

/**
 * Return a list of people from our redux state
 *
 * @param {*} state
 */
const mapStateToProps = (state: IInitialState): IProps => {
  const { isLoading, questionInput, questions, user, roundOptions } = state.game;

  return {
    isLoading,
    questionInput,
    questions,
    user,
    roundOptions,
  };
};

export default connect<IProps, IActions, {}>(mapStateToProps, gameActions)(QuesionInput);
