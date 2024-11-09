import {
  Select as SelectContainer,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

interface SelectProps {
  options: { value: string; label: string }[];
}

const Select = ({ options }: SelectProps) => {
  return (
    <SelectContainer>
      <SelectTrigger>
        <SelectValue placeholder="Selecione" />
      </SelectTrigger>
      <SelectContent>
        {options.map((item, index) => (
          <SelectItem key={index} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectContainer>
  );
};

export default Select;
