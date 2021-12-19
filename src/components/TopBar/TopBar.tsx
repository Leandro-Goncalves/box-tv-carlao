import { ArrowDownward } from "@material-ui/icons";
import { Box } from "@material-ui/system";
import { useEffect, useState } from "react";
import { months } from "../../App";

interface TopBarProps {
  MonthRef: any;
  containerRef: any;
}

export const TopBar: React.FC<TopBarProps> = ({ MonthRef, containerRef }) => {
  const [showTopBar, setShowTopBar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current?.getBoundingClientRect().top < 0) {
        setShowTopBar(true);
      } else {
        setShowTopBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showTopBar, containerRef]);
  return (
    <Box
      style={{
        position: "sticky",
        left: 0,
        right: 0,
        top: 0,
        zIndex: 10,
        paddingLeft: MonthRef.current?.getBoundingClientRect().left,
        display: showTopBar ? "flex" : "none",
        backgroundColor: "#FFF",
        boxShadow: "0px 5px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {months.map((month) => (
        <Box
          style={{
            width: MonthRef.current?.getBoundingClientRect().width,
            height: MonthRef.current?.getBoundingClientRect().height,
            textAlign: "center",
            fontWeight: 500,
            fontSize: "0.875rem",
            lineHeight: "1.5rem",
            letterSpacing: "0.01071em",
            padding: 16,
            boxSizing: "border-box",
            borderBottom: "1px solid rgba(224, 224, 224, 1)",
            color: "rgba(0, 0, 0, 0.87)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {month}
          <ArrowDownward />
        </Box>
      ))}
    </Box>
  );
};
