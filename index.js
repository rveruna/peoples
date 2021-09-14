import React from 'react';
import {
  arrayOf, number, objectOf, shape, string
} from 'prop-types';
import reactHtmlParser from 'react-html-parser';
import { useRouter } from 'next/dist/client/router';

// ui library
import Button from '@pe/ui-library/lib/atoms/buttons/Button/Button';
import Expansion from '@pe/ui-library/lib/atoms/Expansion/Expansion';
import Flex from '@pe/ui-library/lib/atoms/Flex/Flex';
import Form from '@pe/ui-library/lib/atoms/Form/Form';
import FormFieldValueHandler from '@pe/ui-library/lib/atoms/FormFieldValueHandler/FormFieldValueHandler';
import InputRadioWithLabel from '@pe/ui-library/lib/molecules/InputRadioWithLabel/InputRadioWithLabel';
import InputRadioGroup from '@pe/ui-library/lib/molecules/InputRadioGroup/InputRadioGroup';
import InputTextWithLabel from '@pe/ui-library/lib/molecules/InputTextWithLabel/InputTextWithLabel';
import SelectWithLabel from '@pe/ui-library/lib/molecules/SelectWithLabel/SelectWithLabel';
import SVGIcon from '@pe/ui-library/lib/atoms/images/SVGIcon';
import Typography from '@pe/ui-library/lib/atoms/Typography/Typography';

// store
import { useEnergyDetails } from '../store/energyDetails';
import { wrapper } from '../store';

// constants
import { fuelTypes } from '../constants';

// api
import Directus from '../api/directus';
import { getMeterTypes } from '../api/pe';

// helpers
import validations from '../helpers/validators';

// components
import EconomyNightUsage from '../components/molecules/EconomyNightUsage/EconomyNightUsage';
import SignupFormGroup from '../components/molecules/SignupFormGroup/SignupFormGroup';
import SignupJourneyStep from '../components/organisms/SignupJourneyStep/SignupJourneyStep';
import TileRadioButton from '../components/molecules/TileRadioButton/TileRadioButton';
import UnknownUsage from '../components/organisms/UknownUsage/UnknownUsage';

// icons
import GasAndElectricFuelIcon from '../assets/fuel_gas_electric.svg';
import ElectricFuelIcon from '../assets/fuel_electric.svg';
import InfoIcon from '../assets/info.svg';
import UsageElectricity from '../assets/usage_electricity.svg';
import UsageGas from '../assets/usage_gas.svg';

// styles
import '@pe/ui-library/lib/atoms/buttons/Button/Button.css';
import '@pe/ui-library/lib/atoms/Expansion/Expansion.css';
import '@pe/ui-library/lib/atoms/Flex/Flex.css';
import '@pe/ui-library/lib/atoms/inputs/InputError/InputErrorMessage.css';
import '@pe/ui-library/lib/atoms/inputs/InputLabel/InputLabel.css';
import '@pe/ui-library/lib/atoms/inputs/InputRadio/InputRadio.css';
import '@pe/ui-library/lib/atoms/inputs/InputText/InputText.css';
import '@pe/ui-library/lib/atoms/Typography/Typography.css';

// module styles
import styles from './index.module.css';

export default function Home({ meterTypeData, signUpJourneyFormFields }) {
  const router = useRouter();
  const { save, values: initialValues } = useEnergyDetails();

  const handleSubmit = (values) => {
    save(values);
    router.push('./tariff-selection');
  };

  const validators = [
    [
      'postcode',
      (postCode) => postCode.length > 0,
      reactHtmlParser(signUpJourneyFormFields.postCode.errorMessages.required)
    ],
    [
      'postcode',
      (postCode) => validations.validatePostCode(postCode),
      reactHtmlParser(
        signUpJourneyFormFields.postCode.errorMessages.valid_format
      )
    ],
    [
      'annualElectricityConsumption',
      (name) => name.length > 0,
      'Please enter electricity usage'
    ],
    [
      'annualGasConsumption',
      (name) => name.length > 0,
      'Please enter gas usage'
    ]
  ];

  return (
    <SignupJourneyStep
      title={(
        <>
          Get a
          <span className='highlight-koral'> Quote</span>
        </>
      )}
      subtitle='...in 60 seconds!'
    >
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validators={validators}
      >
        <SignupFormGroup>
          <Typography element='p' variant='h2'>
            {/* What is your postcode?  */}
            1.
            {' '}
            {reactHtmlParser(signUpJourneyFormFields.postCode.inputLabel)}
          </Typography>
          <InputTextWithLabel
            htmlFor='postcode'
            name='postcode'
            variant='medium'
          >
            Postcode
          </InputTextWithLabel>
        </SignupFormGroup>
        <SignupFormGroup>
          <Typography element='p' variant='h2'>
            {/* What energy do you need? */}
            2.
            {' '}
            {reactHtmlParser(
              signUpJourneyFormFields.fuelTypeHeading.inputLabel
            )}
          </Typography>
          <Flex>
            <TileRadioButton
              name='fuelType'
              value={fuelTypes.GASELECTRICITY}
              label='Gas & Electricity'
              svg={GasAndElectricFuelIcon}
              title='electric fuel icon'
            />
            <TileRadioButton
              name='fuelType'
              value={fuelTypes.ELECTRICITY}
              label='Electricity'
              svg={ElectricFuelIcon}
              title='electricity fuel icon'
            />
          </Flex>
        </SignupFormGroup>
        <SignupFormGroup>
          <Typography element='p' variant='h2'>
            {/* What meter do you have?  */}
            3.
            {' '}
            {reactHtmlParser(signUpJourneyFormFields.meterType.inputLabel)}
          </Typography>
          <SelectWithLabel
            htmlFor='meterType'
            id='meterType'
            name='meterType'
            defaultValue={{
              value: signUpJourneyFormFields.meterTypeDefault.inputLabel,
              label: signUpJourneyFormFields.meterTypeDefault.inputLabel
            }}
            options={meterTypeData.map((item) => ({
              value: item.text,
              label: item.text
            }))}
            variant='medium'
          >
            Meter type
          </SelectWithLabel>
          <div className={styles['additional-text']}>
            <FormFieldValueHandler
              name='meterType'
              values={{
                Standard: (
                  <Typography variant='body'>
                    A normal single rate meter
                  </Typography>
                ),
                'Classic Standard': (
                  <Typography variant='body'>
                    A normal single rate meter
                  </Typography>
                ),
                'Classic Economy 7': (
                  <Typography variant='body'>
                    A two rate day/night meter
                  </Typography>
                ),
                'Prepay Meter E7': (
                  <div className={styles['info-row']}>
                    <span>
                      <SVGIcon svg={InfoIcon} title='Info icon' />
                    </span>
                    <Typography variant='small'>
                      We can only take over your supply if you already have a
                      prepayment meter installed. We currently cannot take smart
                      meters in prepayment mode. If you have a debt repayment
                      plan in place with your existing supplier, we can&#39;t
                      take over your supply.
                    </Typography>
                  </div>
                ),
                'Prepay Meter': (
                  <div className={styles['info-row']}>
                    <span>
                      <SVGIcon svg={InfoIcon} title='Info icon' />
                    </span>
                    <Typography variant='small'>
                      We can only take over your supply if you already have a
                      prepayment meter installed. We currently cannot take smart
                      meters in prepayment mode. If you have a debt repayment
                      plan in place with your existing supplier, we can&#39;t
                      take over your supply.
                    </Typography>
                  </div>
                ),
                'Smart Standard': (
                  <>
                    <Typography variant='body'>
                      A digital smart meter (with or without in-home display
                    </Typography>
                    <div className={styles['info-row']}>
                      <span>
                        <SVGIcon svg={InfoIcon} title='Info icon' />
                      </span>
                      <Typography variant='small'>
                        We&#39;re not currently able to take readings from
                        first-generation (SMETS1) smart meters. Your meter will
                        still work, but won&#39;t send us readings
                        automatically. An industry programme is under way to
                        make SMETS1 meters &ldquo;smart&rdquo; again. We&#39;ll
                        let you know when yours is up and running.
                      </Typography>
                    </div>
                  </>
                ),
                'Smart Economy 7': (
                  <div className={styles['info-row']}>
                    <span>
                      <SVGIcon svg={InfoIcon} title='Info icon' />
                    </span>
                    <Typography variant='small'>
                      We&#39;re not currently able to take readings from
                      first-generation (SMETS1) smart meters. Your meter will
                      still work, but won&#39;t send us readings automatically.
                      An industry programme is under way to make SMETS1 meters
                      &ldquo;smart&rdquo; again. We&#39;ll let you know when
                      yours is up and running.
                    </Typography>
                  </div>
                ),
                'I don\'t know': (
                  <Typography variant='body'>
                    Don&#39;t worry, we can find this out later
                  </Typography>
                )
              }}
            />
          </div>
        </SignupFormGroup>
        <SignupFormGroup>
          <Typography element='p' variant='h2'>
            {/* How much energy do you use?  */}
            4.
            {' '}
            {reactHtmlParser(
              signUpJourneyFormFields.energyUsageHeading.inputLabel
            )}
          </Typography>

          <InputRadioGroup name='usageRadioGroup'>
            <div className={styles['radio-group']} role='radiogroup'>
              <span className={styles['radio-container']}>
                <InputRadioWithLabel fieldName='isKnownUsage' value>
                  {/* used a tag here to be able to use :active css */}
                  <a className={styles['radio-label']}>
                    {/* this should say 'I know my usage' istead of 'I know' */}
                    {reactHtmlParser(
                      signUpJourneyFormFields['energyUsage-known'].inputLabel
                    )}
                  </a>
                </InputRadioWithLabel>
              </span>

              <span className={styles['radio-container']}>
                <InputRadioWithLabel fieldName='isKnownUsage' value={false}>
                  <a className={styles['radio-label']}>
                    {reactHtmlParser(
                      signUpJourneyFormFields['energyUsage-unknown'].inputLabel
                    )}
                  </a>
                </InputRadioWithLabel>
              </span>
            </div>
          </InputRadioGroup>
          <FormFieldValueHandler
            name='isKnownUsage'
            values={{
              true: (
                <>
                  <Typography variant='body'>
                    We want to make sure you are paying the right amount from
                    the word go, neither too much nor too little. To get this
                    right, we need you to tell us how much energy you use.
                  </Typography>
                  <Expansion
                    headerOpen='Where to find the info'
                    headerClose='Where to find the info'
                  >
                    <Typography variant='body'>
                      - Look at your last energy bill. It&#39;ll show you a
                      figure for
                      <b> &lsquo;actual annual consumption (in kWh)&rsquo;</b>
                      .
                      This will be the most accurate.
                    </Typography>
                    <Typography variant='body'>
                      - Your bill might only show an
                      <b>
                        {' '}
                        &lsquo;estimated annual consumption (in kWh)&rsquo;
                      </b>
                      , usually because you haven&#39;t provided regular meter
                      readings. This is what your energy supplier thinks
                      you&#39;ve used in the last year, so use this.
                    </Typography>
                  </Expansion>

                  <FormFieldValueHandler
                    name='meterType'
                    values={{
                      'Classic Economy 7': (
                        <EconomyNightUsage name='economy7NightPercent' />
                      ),
                      'Prepay Meter E7': (
                        <EconomyNightUsage name='economy7NightPercent' />
                      ),
                      'Smart Economy 7': (
                        <EconomyNightUsage name='economy7NightPercent' />
                      )
                    }}
                  />
                  <div className={styles.flex}>
                    <div className={styles['input-container']}>
                      <SVGIcon
                        hidden
                        svg={UsageElectricity}
                        title='Electricity annual usage icon'
                      />
                      <InputTextWithLabel
                        className={styles['input-text-error']}
                        htmlFor='annualElectricityConsumption'
                        name='annualElectricityConsumption'
                        placeholder='Annual usage'
                        variant='medium'
                      >
                        Electricity
                      </InputTextWithLabel>
                      <Typography variant='body'>kWh / year</Typography>
                    </div>
                    <div className={styles['input-container']}>
                      <SVGIcon
                        hidden
                        svg={UsageGas}
                        title='Gas annual usage icon'
                      />
                      <InputTextWithLabel
                        htmlFor='annualGasConsumption'
                        name='annualGasConsumption'
                        placeholder='Annual usage'
                        variant='medium'
                      >
                        Gas
                      </InputTextWithLabel>
                      <Typography variant='body'>kWh / year</Typography>
                    </div>
                  </div>

                  <Typography variant='body'>
                    National averages are 2900 kWh for electricity and 12000 kWh
                    for gas.
                  </Typography>
                </>
              ),
              false: <UnknownUsage name='estimateType' />
            }}
          />
        </SignupFormGroup>
        <div className={styles['submit-container']}>
          <Button type='submit'>Get a Quote</Button>
        </div>
      </Form>
    </SignupJourneyStep>
  );
}

Home.propTypes = {
  meterTypeData: arrayOf(
    shape({
      dataItemId: number,
      text: string,
      additionalText: string,
      displayOrder: number,
      value: string
    }).isRequired
  ).isRequired,
  signUpJourneyFormFields: objectOf(
    shape({
      postCode: objectOf({
        inputLabel: string,
        errorMessages: objectOf(
          shape({
            valid_format: string,
            required: string
          })
        )
      }),
      fuelTypeHeading: objectOf({
        inputLabel: string,
        errorMessages: objectOf(
          shape({
            required: string
          })
        )
      }),
      meterType: objectOf({
        inputLabel: string,
        errorMessages: objectOf(
          shape({
            required: string
          })
        )
      }),
      energyUsageHeading: objectOf({
        inputLabel: string,
        errorMessages: objectOf(
          shape({
            required: string
          })
        )
      }),
      energyUsageElectricity: objectOf({
        inputLabel: string,
        errorMessages: objectOf(
          shape({
            required: string
          })
        )
      }),
      energyUsageGas: objectOf({
        inputLabel: string,
        errorMessages: objectOf(
          shape({
            required: string
          })
        )
      }),
      'energyUsage-known': objectOf({
        inputLabel: string,
        errorMessages: objectOf(
          shape({
            required: string
          })
        )
      }),
      'energyUsage-unknown': objectOf({
        inputLabel: string,
        errorMessages: objectOf(
          shape({
            required: string
          })
        )
      }),
      'fuelType-Elec': objectOf({
        inputLabel: string,
        errorMessages: objectOf(
          shape({
            required: string
          })
        )
      }),
      'fuelType-GasAndElec': objectOf({
        inputLabel: string,
        errorMessages: objectOf(
          shape({
            required: string
          })
        )
      }),
      meterTypeDefault: objectOf({
        inputLabel: string,
        errorMessages: objectOf(
          shape({
            required: string
          })
        )
      })
    })
  ).isRequired
};

export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  const meterTypeData = await getMeterTypes();
  const { data } = await Directus.getSignUpCollection();

  return {
    props: {
      meterTypeData,
      signUpJourneyFormFields: data.reduce(
        (fields, { field_name, input_label, error_message }) => ({
          ...fields,
          ...(field_name && {
            [field_name]: {
              inputLabel: input_label,
              errorMessages: error_message
            }
          })
        }),
        {}
      )
    }
  };
});
