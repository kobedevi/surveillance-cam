import { useState } from 'react';
import useUpdateSettings from '../../../core/hooks/mutations/useUpdateSettings';
import equals from '../../../core/utils/equals';
import { Button } from '../../Design';
import { Checkbox, Slider } from '../../Design/form';

const SettingsForm = ({ settings }) => {
  const [formData, setFormData] = useState(settings);
  const mutation = useUpdateSettings();

  const handleInput = (e) => {
    const value =
      e.target.type === 'checkbox'
        ? e.target.checked
        : e.target.type === 'range'
        ? +e.target.value
        : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!equals(settings, formData)) {
      mutation.mutate(formData);
    }
  };

  const resetForm = () => {
    setFormData(settings);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Checkbox
        name="led"
        label="Enable LED"
        checked={formData.led}
        onChange={handleInput}
      />

      <Slider
        name="motionThreshold"
        label="Motion threshold"
        value={formData.motionThreshold}
        onChange={handleInput}
        min="25"
        max="100"
        step="5"
        info="The amount of frames that need to have motion before taking action. Default is 50."
      />

      <Slider
        name="contourArea"
        label="Minimum area"
        value={formData.contourArea}
        onChange={handleInput}
        min="100"
        max="2000"
        step="100"
        info="The minimum size of the area in the frame to count as motion. Default is 800."
      />

      <Slider
        name="docStaleTime"
        label="Time between groups"
        value={formData.docStaleTime}
        onChange={handleInput}
        min="1"
        max="15"
        step="1"
        info="The duration in minutes between two detection before a new group is created. Default is 5."
      />

      <Slider
        name="daysBeforeRemoval"
        label="Days to keep recordings"
        value={formData.daysBeforeRemoval}
        onChange={handleInput}
        min="1"
        max="30"
        step="1"
        info="The number of days before recordings are automatically removed (unless locked). Default is 7."
      />

      {!equals(settings, formData) && (
        <>
          <Button
            color="muted"
            icon={false}
            disabled={mutation.isLoading}
            onClick={resetForm}
          >
            Discard
          </Button>
          <Button
            type="submit"
            color="secondary"
            icon={false}
            disabled={mutation.isLoading}
          >
            Save
          </Button>
        </>
      )}
    </form>
  );
};

export default SettingsForm;
